import React from 'react';
import { SafeAreaView } from 'react-native';
import { Text, Button } from 'native-base';

import * as firebase from 'firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const sensorName = 'sensor2';

const GetGraphData = () => {
  const generateTimes = (primerValor, ultimoValor) => {
    console.log('generateTimes', primerValor, ultimoValor);
    return 0; // debe retornar un array con las horas a mostrar
  };

  const manageData = (snapshot) => {
    const newSnapshot = JSON.stringify(snapshot);

    /* console.log('manage_data:', newSnapshot); */

    console.log(Object.keys(snapshot));

    // Obtener hora inicial-final (falta formatear esto)
    const primerValor = Object.keys(snapshot)[0];
    const ultimoValor = Object.keys(snapshot)[Object.keys(snapshot).length - 1];

    console.log('Datos obtenidos desde: ', primerValor, ' Hasta: ', ultimoValor);

    // Generar timestamps intermedios
    const times = generateTimes(primerValor, ultimoValor);

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
  };

  const GetData = () => {
    console.log('Obteniendo datos...');

    /* Retorna el snapshot */
    /* firebase
      .database()
      .ref(`/${sensorName}`)
      .limitToLast(5)
      .once('value', function (snapshot) {
        manageData(snapshot);
      }); */

    const snapshot = {
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

    manageData(snapshot);

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
