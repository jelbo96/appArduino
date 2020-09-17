import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Text } from 'native-base';

import Constants from 'expo-constants';

export default function DetailsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <Text style={styles.titleText}>Detalles</Text>
        <Text>En esta vista se mostrarán graficos historicos.</Text>
      </View>
    </SafeAreaView>
  );
}

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
  }
});
