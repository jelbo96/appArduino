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
  const [sensors, setSensors] = useState([]);

  const getNameSensors = () => {
    firebase
      .database()
      .ref('/nameSensors')
      .once('value')
      .then(function (snapshot) {
        console.log('keys', Object.keys(snapshot.val()));

        console.log(snapshot.val().sensor1);
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

        {/* Aqui hay que meter los checkbox */}
      </View>
      <View style={styles.viewList}>
        {/* Recorrer los sensores */}

        {sensors.map((data) => (
          <ListItem>
            <CheckBox checked />
            <Body>
              <Text>{data}</Text>
            </Body>
          </ListItem>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button block>
          <Text>Confirmar</Text>
        </Button>
      </View>
      {/* 
        <ListItem>
          <CheckBox checked={false} />
          <Body>
            <Text>Discussion with Client</Text>
          </Body>
        </ListItem> */}
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
