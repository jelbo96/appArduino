import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Card, CardItem, Body, Text, Button } from 'native-base';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import Constants from 'expo-constants';

import * as firebase from 'firebase';

import moment from 'moment';
import TextWithProps from './TextWithProps';

require('moment/locale/es');

moment.locale('es');

const firebaseConfig = {
  apiKey: 'AIzaSyDDD_3NmUFE8EzlxstSCtNmc1FoxWXIX9s',
  authDomain: 'test-arduino-d6faa.firebaseapp.com',
  databaseURL: 'https://test-arduino-d6faa.firebaseio.com',
  projectId: 'test-arduino-d6faa',
  storageBucket: 'test-arduino-d6faa.appspot.com',
  messagingSenderId: '145095714021',
  appId: '1:145095714021:web:c840d52103f57bd878e00c'
};

firebase.initializeApp(firebaseConfig);

const DetailsScreen = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  const [sensorDataArray, setSensorDataArray] = useState([]);

  useEffect(() => {
    const getData = (nameSensors) => {
      // Extraer los nombres de los sensores
      console.log('Get Data - Name Sensors', nameSensors);

      nameSensors.map((sensor) => {
        console.log(sensor);

        const refAll = firebase.database().ref(`${sensor}/`);
        refAll
          .orderByKey()
          .limitToLast(1)
          .once('value', function (snapshot) {
            snapshot.forEach((child) => {
              const value = child.val();

              const sensorData = {
                name: sensor,
                temp: value.temperature,
                hum: value.humidity,
                light: value.light.toFixed(2),
                time: moment(new Date(value.timestamp * 1000).toISOString()).fromNow()
              };

              console.log(sensorData);
            });
          });
      });
    };

    const getNameSensors = () => {
      firebase
        .database()
        .ref('/availableSensors')
        .once('value')
        .then(function (snapshot) {
          getData(snapshot.val());
        });
    };

    getNameSensors();
    console.log('array', sensorDataArray);
  }, [refreshing]);

  const onRefresh = React.useCallback(() => {
    console.log('se oprimio el boton');
    setRefreshing(true);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text> {sensorDataArray} </Text>
       */}
      <Button onPress={onRefresh}>
        <Text>Recargar </Text>
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1
  },
  numberDataText: {
    fontSize: 60,
    fontWeight: 'bold'
  },
  inline: {
    // Meter propiedades de inline aqui
    flexDirection: 'row',
    alignSelf: 'flex-start'
  }
});

export default DetailsScreen;
