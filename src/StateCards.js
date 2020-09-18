import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, CardItem, Body, Text } from 'native-base';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import moment from 'moment';

require('moment/locale/es');

moment.locale('es');

const StateCards = (props) => {
  return (
    <>
      <Text style={styles.titleText}> {props.name} </Text>
      <Card>
        <CardItem>
          <Body>
            <View style={styles.inline}>
              <FontAwesome5 name="temperature-low" size={16} color="black" />
              <Text> Temperatura</Text>
            </View>
            <Text style={styles.numberDataText}>{props.temp} °C </Text>
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
            <Text style={styles.numberDataText}>{props.hum} % </Text>
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
              {props.lum} %<Text> </Text>{' '}
            </Text>
          </Body>
        </CardItem>
      </Card>
      <Text style={styles.centerText}>
        Ultima actualización: {props.time} {'\n'}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  numberDataText: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  inline: {
    // Meter propiedades de inline aqui
    flexDirection: 'row',
    alignSelf: 'flex-start'
  }
});

export default StateCards;
