import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Card, CardItem, Right, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const CardLink = (props) => {
  const navigation = useNavigation();

  return (
    <Card>
      <CardItem
        header
        button
        onPress={() => {
          navigation.navigate('Graphs', {
            sensorKey: 'sensor1' /*  props.nameSensor */
          });
        }}
      >
        <Text>{props.nameSensor}</Text>
        <Right style={styles.rightIcon}>
          <Icon name="arrow-forward" />
        </Right>
      </CardItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  rightIcon: {
    marginLeft: 200
  }
});

export default CardLink;
