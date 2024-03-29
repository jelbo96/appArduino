import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, Switch } from 'react-native';
import { ListItem, Text, Body, Button, Toast } from 'native-base';
import Constants from 'expo-constants';
import * as firebase from 'firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const SettingsScreen = () => {
  const [sensors, setSensors] = useState({});
  const [checked, setChecked] = useState(false);

  const cambiarEstadoCheckbox = () => {
    if (checked == true) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };

  const getNameSensors = () => {
    firebase
      .database()
      .ref('/nameSensors/sensors')
      .once('value')
      .then(function (snapshot) {
        setSensors(snapshot.val());
      });
  };

  const changeValue = (keySensor) => {
    const newSensor = sensors;

    if (newSensor[keySensor] == true) {
      newSensor[keySensor] = false;
    } else {
      newSensor[keySensor] = true;
    }

    setSensors(newSensor);
  };

  const updateSensorsAvailable = () => {
    console.log('update sensors:', sensors);

    firebase
      .database()
      .ref('nameSensors/')
      .set(
        {
          sensors
        },
        function (error) {
          if (error) {
            Toast.show({
              text: 'Ha ocurrido un error, intentelo nuevamente.',
              textStyle: { textAlign: 'center' },
              position: 'bottom',
              style: { bottom: 30 }
            });
          } else {
            // Data saved successfully!
            Toast.show({
              text: 'Se ha guardado la información.',
              textStyle: { textAlign: 'center' },
              position: 'bottom',
              style: { bottom: 30 }
            });
          }
        }
      );
  };

  useEffect(() => {
    getNameSensors();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.scrollView}>
          <Text>
            Selecciona los sensores que deseas que se muestren en la app, lo que no se seleccionen
            se mantendrán recopilando información.
          </Text>
        </View>
        <View style={styles.viewList}>
          {Object.keys(sensors).map((key) => (
            <ListItem key={key}>
              <Switch
                onValueChange={() => {
                  changeValue(key);
                  cambiarEstadoCheckbox();
                }}
                value={sensors[key]}
              />
              <Body>
                <Text>{key}</Text>
              </Body>
            </ListItem>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <Button block onPress={updateSensorsAvailable}>
            <Text>Confirmar</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    /*  marginTop: Constants.statusBarHeight, */
    flex: 1
  },
  scrollView: {
    padding: 20
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
