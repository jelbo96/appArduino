import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const TextWithProps = (props) => {
  return (
    <View>
      <Text style={styles.textStyle}>
        {' '}
        Hola {props.x} - {props.y}{' '}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 32,
    fontWeight: 'bold'
  }
});

export default TextWithProps;
