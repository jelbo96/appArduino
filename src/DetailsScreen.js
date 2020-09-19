import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';
import { Text, CardItem, Right, Card, Icon } from 'native-base';

import Constants from 'expo-constants';

import * as firebase from 'firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const DetailsScreen = ({ navigation }) => {
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
      <ScrollView>
        <View style={styles.viewContainer}>
          <Text>Selecciona un sensor para ver mas información. {'\n'}</Text>

          {Object.keys(sensors).map((key) => (
            <Card>
              <CardItem
                header
                button
                key={key}
                onPress={() => {
                  /* alert('Haz seleccionado el '.concat(key)); */
                  navigation.navigate('Graphs', {
                    sensorKey: key
                  });
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    /*  marginTop: Constants.statusBarHeight, */
    flex: 1
  },
  viewContainer: {
    padding: 20
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
