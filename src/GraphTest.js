import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Text } from 'native-base';

import { LineChart } from 'react-native-chart-kit';

import * as firebase from 'firebase';
import moment from 'moment';

require('moment/locale/es');

moment.locale('es');

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const GraphTest = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [graphLabels, setGraphLabels] = useState(['Ene', 'Feb', 'Mar', 'Abr', 'May']);
  const [dataTemperature, setDataTemperature] = useState([24, 33, 22, 34, 43]);
  const [dataHumidity, setDataHumidity] = useState([23, 31, 45, 52, 42]);
  const [dataLight, setDataLight] = useState([27, 32, 35, 30, 28]);
  const [initialTime, setInitialTime] = useState('...');
  const [finalTime, setFinalTime] = useState('...');

  const getRange = (upper, lower, steps) => {
    const difference = upper - lower;
    const increment = difference / (steps - 1);
    return [
      lower,
      ...Array(steps - 2)
        .fill('')
        .map((_, index) => lower + increment * (index + 1)),
      upper
    ];
  };

  const generateTimes = (primerValor, ultimoValor) => {
    const initialValue = new Date(primerValor);
    const finalValue = new Date(ultimoValor);

    // Convertir a timestamp primer y ultimo
    const initialValueTimestamp = initialValue.getTime();
    const finalValueTimestamp = finalValue.getTime();

    // Obtener 3 timestamps intermedios
    const arrayTimestamps = getRange(finalValueTimestamp, initialValueTimestamp, 5);

    // Convertir a formato hh:mm
    const arrayHours = arrayTimestamps.map((e) => {
      return moment.utc(e).format('HH:mm');
    });

    // retornar el array
    return arrayHours;
  };

  const manageData = (data) => {
    console.log('1');

    const snapshot = JSON.parse(JSON.stringify(data));

    console.log('2');

    console.log(snapshot);

    // Obtener hora inicial-final (falta formatear esto)
    const primerValor = moment
      .utc(Object.keys(snapshot)[0])
      .format('DD [de] MMMM [del] YYYY [a las:] HH:mm');
    const ultimoValor = moment
      .utc(Object.keys(snapshot)[Object.keys(snapshot).length - 1])
      .format('DD [de] MMMM [del] YYYY [a las:] HH:mm');

    setInitialTime(primerValor);
    setFinalTime(ultimoValor);

    console.log('Datos obtenidos desde: ', primerValor, ' Hasta: ', ultimoValor);

    // Generar timestamps intermedios
    const times = generateTimes(
      Object.keys(snapshot)[0],
      Object.keys(snapshot)[Object.keys(snapshot).length - 1]
    ); //
    setGraphLabels(times);

    // Llenar array de datos
    const values = Object.values(snapshot);

    const temperaturas = [];
    const humedades = [];
    const luminosidades = [];

    values.forEach((e) => {
      /* console.log('temp', e.temperature, 'hu', e.humidity, 'l', e.light, 'time', e.timestamp); */
      temperaturas.push(e.temperature);
      humedades.push(e.humidity);
      luminosidades.push(e.light);
    });

    setDataTemperature(temperaturas);
    setDataHumidity(humedades);
    setDataLight(luminosidades);

    console.log('temp', dataTemperature, 'lum', dataLight, 'hum', dataHumidity);
  };

  const getData = () => {
    console.log('Obteniendo datos...');

    /* Retorna el snapshot */
    firebase
      .database()
      .ref(`/${props.sensorKey}`)
      .limitToLast(5)
      .once('value', function (snapshot) {
        manageData(snapshot);
      });

    /* const snapshot = {
      '2020-09-20T19:18:57Z': {
        humidity: 52,
        light: 32.71484,
        temperature: 21.8,
        timestamp: 1600629000
      },
      '2020-09-20T19:19:07Z': {
        humidity: 53,
        light: 32.32422,
        temperature: 22.2,
        timestamp: 1600629000
      },
      '2020-09-20T19:19:17Z': {
        humidity: 52,
        light: 32.42188,
        temperature: 21,
        timestamp: 1600629000
      },
      '2020-09-20T19:19:27Z': {
        humidity: 53,
        light: 32.51953,
        temperature: 22.2,
        timestamp: 1600629000
      },
      '2020-09-20T19:19:37Z': {
        humidity: 53,
        light: 31.54297,
        temperature: 22.2,
        timestamp: 1600630000
      }
    };

    manageData(snapshot); */

    /* Sacar el primer y ultimo key, con eso se puede mostrar: data obtenida desde DIA-HORA hasta DIA-HORA */

    /* A partir del primer y ultimo TIMESTAMP tambien sacar timestamps entremedio para poner en el grafico */
  };

  const initialData = {
    labels: graphLabels,
    datasets: [
      // Formato temperatura - humedad - luz
      {
        data: dataTemperature,
        color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`
      },
      {
        data: dataHumidity,
        color: (opacity = 1) => `rgba(52, 199, 89, ${opacity})`
      },
      {
        data: dataLight,
        color: (opacity = 1) => `rgba(255, 149, 0, ${opacity})`
      }
    ],
    legend: ['Temperatura', 'Humedad', 'Luz'] // optional
  };

  const screenWidth = Dimensions.get('window').width;

  const chartConfig = {
    backgroundGradientFrom: '#f2f2f2',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: 'white',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(99, 99, 99, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  useEffect(() => {
    console.log('useEffect');
    getData();
  }, []);

  /*   const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setDataHumidity([12, 12, 43, 12, 43]);
    setRefreshing(false);
    console.log('recargando');
  }, [refreshing]); */

  return (
    <View style={styles.container}>
      {/* <Text style={styles.textPadding}>
        Se está mostrando graficos para {props.sensorKey} en formato {props.tab}
      </Text> */}

      <LineChart
        data={initialData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
      />
      <Text style={styles.textPadding}>
        Información obtenida desde el {initialTime} hasta el {finalTime}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  textPadding: {
    padding: 20
  }
});

export default GraphTest;
