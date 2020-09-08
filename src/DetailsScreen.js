import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

import Constants from 'expo-constants';

import TextWithProps from './TextWithProps';

function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text>Pantalla de Detalles</Text>
      <TextWithProps x="ignacio" y="jelvez" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  }
});

export default HomeScreen;
