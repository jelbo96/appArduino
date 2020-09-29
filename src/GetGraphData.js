import React from 'react';
import { SafeAreaView } from 'react-native';
import { Text, Button } from 'native-base';

import * as firebase from 'firebase';
import moment from 'moment';

require('moment/locale/es');

moment.locale('es');

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const sensorName = 'sensor2';

const GetGraphData = () => {
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
    const snapshot = JSON.parse(JSON.stringify(data));

    console.log('snapshot', snapshot, typeof snapshot);

    // Obtener hora inicial-final (falta formatear esto)
    const primerValor = moment
      .utc(Object.keys(snapshot)[0])
      .format('DD [de] MMMM [del] YYYY [a las:] HH:mm');
    const ultimoValor = moment
      .utc(Object.keys(snapshot)[Object.keys(snapshot).length - 1])
      .format('DD [de] MMMM [del] YYYY [a las:] HH:mm');

    console.log('Datos obtenidos desde: ', primerValor, ' Hasta: ', ultimoValor);

    // Generar timestamps intermedios
    const times = generateTimes(primerValor, ultimoValor);
    console.log('times', times);

    // Llenar array de datos
    const values = Object.values(snapshot);

    /* console.log('values', values);
     */
    const temperaturas = [];
    const humedades = [];
    const luminosidades = [];

    values.forEach((e) => {
      /* console.log('temp', e.temperature, 'hu', e.humidity, 'l', e.light, 'time', e.timestamp); */
      temperaturas.push(e.temperature);
      humedades.push(e.humidity);
      luminosidades.push(e.light);
    });

    /*  console.log(temperaturas, humedades, luminosidades); */
  };

  const GetData = () => {
    console.log('Obteniendo datos...');

    /* Retorna el snapshot */
    firebase
      .database()
      .ref(`/${sensorName}`)
      .limitToLast(5)
      .once('value', function (snapshot) {
        manageData(snapshot);
      });

    /*  const snapshot = {
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

  return (
    <SafeAreaView>
      <Text> Revise la consola para ver los datos </Text>
      <Button onPress={() => GetData()}>
        <Text>Obtener Datos</Text>
      </Button>
    </SafeAreaView>
  );
};

export default GetGraphData;
