import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, RefreshControl } from 'react-native';
import { Text, CardItem, Right, Card, Icon } from 'native-base';

import Constants from 'expo-constants';

import * as firebase from 'firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const DetailsScreen = ({ navigation }) => {
  const [sensors, setSensors] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getNameSensors = () => {
    firebase
      .database()
      .ref('/nameSensors/sensors')
      .once('value')
      .then(function (snapshot) {
        const snapshotValue = snapshot.val();
        const nameSensorsAvailable = [];
        Object.keys(snapshotValue).map((key) => {
          if (snapshotValue[key] == true) {
            nameSensorsAvailable.push(key);
          }
        });
        setSensors(nameSensorsAvailable);
      });
  };

  useEffect(() => {
    getNameSensors();
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getNameSensors();
    setRefreshing(false);
  }, [refreshing]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.viewContainer}>
          <Text>Selecciona un sensor para ver mas información. {'\n'}</Text>

          {sensors.map((key) => (
            <Card>
              <CardItem
                header
                button
                key={key}
                onPress={() => {
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
