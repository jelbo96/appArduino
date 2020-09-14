import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, RefreshControl } from 'react-native';
import { Card, CardItem, Body, Text, Button } from 'native-base';
import Constants from 'expo-constants';

import * as firebase from 'firebase';

import moment from 'moment';
import StateCards from './StateCards';

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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [count, setCount] = useState(0);
  const [sensorDataArray, setSensorDataArray] = useState([]);

  const getData = (nameSensors) => {
    // Extraer los nombres de los sensores
    console.log('Get Data - Name Sensors', nameSensors);

    nameSensors.map((sensor) => {
      /* console.log(sensor); */
      setSensorDataArray([]);
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
            console.log('se esta agregando data ....');

            setSensorDataArray((sensorDataArray) => sensorDataArray.concat(sensorData));
          });
        });
    });
    setRefreshing(false);
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

  useEffect(() => {
    console.log('-------------------------------------------------------');

    getNameSensors();
    console.log('array: ', sensorDataArray);
  }, [refreshing]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={styles.titleText}>Inicio</Text>
        {/* console.log(dataSensor) */}
        {sensorDataArray.map((data) => (
          <StateCards
            key={data.name} // data.name
            name={data.name}
            temp={data.temp}
            hum={data.hum}
            lum={data.light}
            time={data.time}
          />
        ))}
      </ScrollView>
      {/* <Button onPress={() => setCount(count + 1)}>
        <Text>Recargar </Text>
      </Button> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1
  },
  scrollView: {
    padding: 20,
    paddingTop: 35
  },
  titleText: {
    fontSize: 42,
    fontWeight: 'bold',
    paddingBottom: 15
  },

  centerText: {
    textAlign: 'center',
    paddingBottom: 5
  }
});

export default HomeScreen;
