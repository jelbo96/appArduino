import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Text } from 'native-base';
import { VictoryPie } from 'victory-native';

import { LineChart } from 'react-native-chart-kit';

/* import styles from './styles'; */

const graphicColor = ['#388087', '#6fb3b8', '#badfe7']; // Colors
const wantedGraphicData = [{ y: 10 }, { y: 50 }, { y: 40 }]; // Data that we want to display
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }]; // Data used to make the animate prop work

const TestScreen = (props) => {
  const [graphicData, setGraphicData] = useState(defaultGraphicData);
  const [refreshing, setRefreshing] = useState(false);

  const initialData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ['Rainy Days'] // optional
  };

  const screenWidth = Dimensions.get('window').width * 0.9;

  const chartConfig = {};

  useEffect(() => {
    setGraphicData(wantedGraphicData); // Setting the data that we want to display
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    setGraphicData([]);
    setGraphicData(wantedGraphicData);
    setRefreshing(false);
    console.log('recargando');
  }, [refreshing]);

  return (
    <View style={styles.container}>
      <Text>
        Se está mostrando graficos para {props.sensorKey} en formato {props.tab}
      </Text>

      <View>
        {/* <LineChart data={initialData} width={screenWidth} height={220} chartConfig={chartConfig} /> */}
      </View>

      <Button refreshing={refreshing} onPress={onRefresh}>
        <Text> Recargar </Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  }
});

export default TestScreen;
