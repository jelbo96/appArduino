import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, RefreshControl } from 'react-native';
import { Card, CardItem, Body, Text } from 'native-base';
import Constants from 'expo-constants';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import * as firebase from 'firebase';

import moment from 'moment';

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

const HomeScreen = () => {
  const [humidity, setHumidity] = useState('...');
  const [temperature, setTemperature] = useState('...');
  const [light, setLight] = useState('...');
  const [lastUpdateText, setLastUpdateText] = useState('...');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    console.log('useEffect');

    const refAll = firebase.database().ref('sensor2/');
    refAll
      .orderByKey()
      .limitToLast(1)
      .once('value', function (snapshot) {
        snapshot.forEach((child) => {
          const value = child.val();
          setTemperature([value.temperature]);
          setHumidity([value.humidity]);
          setLight([value.light.toFixed(2)]);

          const date = new Date(value.timestamp * 1000).toISOString();

          setLastUpdateText([moment(date).fromNow()]);
        });
      });
    // Siempre setear update en false (cambiarlo cuando se pida actualizar)
    setRefreshing(false);
  }, [refreshing]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
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

              <Text style={styles.numberDataText}>
                {light} %<Text> </Text>{' '}
              </Text>
            </Body>
          </CardItem>
        </Card>
      </ScrollView>
      <Text style={styles.centerText}>Ultima actualización: {lastUpdateText}</Text>
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
  },
  centerText: {
    textAlign: 'center',
    paddingBottom: 5
  }
});

export default HomeScreen;
