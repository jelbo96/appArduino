import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Text } from 'native-base';
import Constants from 'expo-constants';

const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollView}>
        <Text style={styles.titleText}>Configuraciones</Text>
        <Text>
          Esta es la vista de Configuraciones, aqui podra seleccionar los sensores que desea que se
          vean en la app.
        </Text>
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
  }
});

export default SettingsScreen;
