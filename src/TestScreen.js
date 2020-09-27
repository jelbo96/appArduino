import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Text } from 'native-base';

import { LineChart } from 'react-native-chart-kit';

/* import styles from './styles'; */

const graphicColor = ['#388087', '#6fb3b8', '#badfe7']; // Colors
const wantedGraphicData = [{ y: 10 }, { y: 50 }, { y: 40 }]; // Data that we want to display
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }]; // Data used to make the animate prop work

const TestScreen = (props) => {
  const [graphicData, setGraphicData] = useState(defaultGraphicData);
  const [refreshing, setRefreshing] = useState(false);

  const initialData = {
    labels: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May' /* 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' */
    ],
    datasets: [
      // Formato temperatura - humedad - luz
      {
        data: [24, 33, 22, 34, 43],
        color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`
      },
      {
        data: [23, 31, 45, 52, 42],
        color: (opacity = 1) => `rgba(52, 199, 89, ${opacity})`
      },
      {
        data: [27, 32, 35, 30, 28],
        color: (opacity = 1) => `rgba(255, 149, 0, ${opacity})`
      }
    ],
    legend: ['Temperatura', 'Humedad', 'Luz'] // optional
  };

  const screenWidth = Dimensions.get('window').width;

  const chartConfig = {
    backgroundGradientFrom: '#f2f2f2',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: 'white',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(99, 99, 99, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

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
      <Text style={styles.textPadding}>
        Se está mostrando graficos para {props.sensorKey} en formato {props.tab}
      </Text>

      <LineChart
        data={initialData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
      />

      <View style={styles.textPadding}>
        <Button refreshing={refreshing} onPress={onRefresh}>
          <Text> Recargar </Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textPadding: {
    padding: 20
  }
});

export default TestScreen;
