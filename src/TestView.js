import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
import Constants from 'expo-constants';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import * as firebase from 'firebase';

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

const TestView = () => {
  const [humidity, setHumidity] = useState('...');
  const [temperature, setTemperature] = useState('...');
  const [light, setLight] = useState('...');
  const [lastUpdate, setLastUpdate] = useState('...');
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    console.log('useEffect');
    // Humedad
    const refHumidity = firebase.database().ref('sensor/humidity');
    refHumidity
      .orderByKey()
      .limitToLast(1)
      .once('value', function (snapshot) {
        snapshot.forEach((child) => {
          // La hora es child.key
          // console.log(child.key);
          setLastUpdate(child.key);
          setHumidity([child.val()]);
        });
      });

    // Temperatura
    const refTemperature = firebase.database().ref('sensor/temperature');
    refTemperature
      .orderByKey()
      .limitToLast(1)
      .once('value', function (snapshot) {
        console.log(snapshot);
        snapshot.forEach((child) => {
          // console.log('temperatura');
          setTemperature([child.val()]);
        });
      });

    // Luz
    const refLight = firebase.database().ref('sensor/light');
    refLight
      .orderByKey()
      .limitToLast(1)
      .once('value', function (snapshot) {
        snapshot.forEach((child) => {
          // console.log('light');
          setLight([child.val()]);
        });
      });

    // Siempre setear update en false (cambiarlo cuando se pida actualizar)
    setUpdate(false);
  }, [update]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.titleText}>Inicio</Text>

        <Card>
          <CardItem>
            <Body>
              <View style={styles.inline}>
                <FontAwesome5 name="temperature-low" size={16} color="black" />
                <Text> Temperatura</Text>
              </View>
              <Text style={styles.numberDataText}>{temperature} °C </Text>
            </Body>
          </CardItem>
        </Card>

        <Card>
          <CardItem>
            <Body>
              <View style={styles.inline}>
                <Ionicons name="ios-water" size={16} color="black" />
                <Text> Humedad</Text>
              </View>
              <Text style={styles.numberDataText}>{humidity} % </Text>
            </Body>
          </CardItem>
        </Card>

        <Card>
          <CardItem>
            <Body>
              <View style={styles.inline}>
                <Ionicons name="ios-sunny" size={16} color="black" />
                <Text> Luminosidad</Text>
              </View>
              <Text style={styles.numberDataText}>{light} </Text>
            </Body>
          </CardItem>
        </Card>

        <Text> Ultima actualización: {lastUpdate} </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1
  },
  scrollView: {
    // backgroundColor: 'pink'
    // marginHorizontal: 20
  },
  titleText: {
    fontSize: 42,
    fontWeight: 'bold'
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

export default TestView;
