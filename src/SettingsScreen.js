import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Container, Header, Content, ListItem, CheckBox, Text, Body, Button } from 'native-base';
import Constants from 'expo-constants';
import * as firebase from 'firebase';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const SettingsScreen = () => {
  const [sensors, setSensors] = useState({});

  const getNameSensors = () => {
    firebase
      .database()
      .ref('/nameSensors')
      .once('value')
      .then(function (snapshot) {
        /* console.log('keys', Object.keys(snapshot.val())); */

        console.log('snapshotval', snapshot.val());
        /* 
        const sensorData = [{ sensor1: 0 }, { sensor2: 1 }, { sensor3: 0 }];

        console.log('sensors', sensorData, 'type', typeof sensorData); */
        setSensors(snapshot.val());

        /* const keys = Object.keys(snapshot);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          console.log(key, snapshot[key]);
        } */
        /* console.log('snapshot', snapshot.val());
        setSensors(snapshot.val()); */
      });
  };

  useEffect(() => {
    getNameSensors();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollView}>
        <Text style={styles.titleText}>Configuraciones</Text>
        <Text>
          Selecciona los sensores que deseas que se muestren en la app, lo que no se seleccionen se
          mantendrán recopilando información.
        </Text>
      </View>
      <View style={styles.viewList}>
        {/*  {sensors.map((data) => (
          <>
            <Text> Hola </Text>
            <ListItem>
              <CheckBox checked />
              <Body>
                <Text>{data.child.key}</Text>
              </Body>
            </ListItem>
          </>
        ))} */}
        {Object.keys(sensors).map((key) => (
          <ListItem key={key}>
            <CheckBox checked={!!sensors[key]} />
            <Body>
              <Text>{key}</Text>
            </Body>
          </ListItem>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button block>
          <Text>Confirmar</Text>
        </Button>
      </View>
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
  viewList: {
    backgroundColor: 'white'
  },
  buttonContainer: {
    padding: 20
  }
});

export default SettingsScreen;
