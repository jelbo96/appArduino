import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Text, ListItem, Body, CardItem, Content, Right, Card, Icon } from 'native-base';

import Constants from 'expo-constants';

import * as firebase from 'firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const DetailsScreen = () => {
  const [sensors, setSensors] = useState({});

  const getNameSensors = () => {
    firebase
      .database()
      .ref('/nameSensors/sensors')
      .once('value')
      .then(function (snapshot) {
        setSensors(snapshot.val());
      });
  };

  useEffect(() => {
    getNameSensors();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <Text style={styles.titleText}>Detalles</Text>
        <Text> Selecciona un sensor para ver mas información. {'\n'}</Text>

        {Object.keys(sensors).map((key) => (
          <Card>
            <CardItem
              header
              button
              key={key}
              onPress={() => {
                alert('Haz seleccionado el '.concat(key));
              }}
            >
              <Text>{key}</Text>
              <Right style={styles.rightIcon}>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
          </Card>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1
  },
  viewContainer: {
    padding: 20,
    paddingTop: 35
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#eeeeee'
  },
  titleText: {
    fontSize: 42,
    fontWeight: 'bold',
    paddingBottom: 15
  },
  rightIcon: {
    marginLeft: 200
  }
});

export default DetailsScreen;
