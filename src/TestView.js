import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
import Constants from 'expo-constants';

import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const TestView = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.titleText}>Inicio</Text>

        <Card>
          <CardItem>
            <Body>
              <View style={styles.inline}>
                <FontAwesome5 name="temperature-low" size={16} color="black" />
                <Text>Temperatura</Text>
              </View>
              <Text style={styles.numberDataText}>12 °C </Text>
            </Body>
          </CardItem>
        </Card>

        <Card>
          <CardItem>
            <Body>
              <View style={styles.inline}>
                <Ionicons name="ios-water" size={16} color="black" />
                <Text>Humedad</Text>
              </View>
              <Text style={styles.numberDataText}>67 % </Text>
            </Body>
          </CardItem>
        </Card>

        <Card>
          <CardItem>
            <Body>
              <View style={styles.inline}>
                <Ionicons name="ios-sunny" size={16} color="black" />
                <Text>Luminosidad</Text>
              </View>
              <Text style={styles.numberDataText}>20 % </Text>
            </Body>
          </CardItem>
        </Card>

        <Text> Ultima actualización: Hace X minutos </Text>
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
