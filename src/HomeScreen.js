import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';

function HomeScreen() {
    return (
      <View style={styles.container}>
        <Text>Pantalla de Inicio</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
  });
  

  export default HomeScreen;