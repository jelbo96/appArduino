import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, RefreshControl } from 'react-native';
import { Card, CardItem, Body, Text } from 'native-base';
import Constants from 'expo-constants';

import StateCards from './StateCards';

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [dataSensor, setDataSensor] = useState([
    { name: 'loading', temp: '...', hum: '...', light: '...', time: '...' }
  ]);

  useEffect(() => {
    // console.log('useEffect- typeofData:', typeof dataSensor);
    setRefreshing(false);

    // La data se tiene que obtener y guardar en este formato
    setDataSensor([
      { name: 'Sensor 1', temp: '12', hum: '13', light: '10', time: '0' },
      { name: 'Sensor 2', temp: '22', hum: '23', light: '20', time: '0' }
    ]);

    // dataSensor.push({ name: 'Sensor 3', temp: '13', hum: '14', light: '50', time: '20' });
    // setDataSensor(dataSensor);
    dataSensor.map((testData) => console.log(testData.name));
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
        {/* console.log(dataSensor) */}
        {dataSensor.map((data) => (
          <StateCards
            key={data.name}
            name={data.name}
            temp={data.temp}
            hum={data.hum}
            lum={data.light}
            time={data.time}
          />
        ))}
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
