import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import { VictoryPie } from 'victory-native';

/* import styles from './styles'; */

const graphicColor = ['#388087', '#6fb3b8', '#badfe7']; // Colors
const wantedGraphicData = [{ y: 10 }, { y: 50 }, { y: 40 }]; // Data that we want to display
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }]; // Data used to make the animate prop work

const TestScreen = (props) => {
  const [graphicData, setGraphicData] = useState(defaultGraphicData);
  const [refreshing, setRefreshing] = useState(false);

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
    <View /* style={styles.container} */>
      <Text>
        Se está mostrando graficos para {props.sensorKey} en formato {props.tab}
      </Text>
      <VictoryPie
        animate={{ easing: 'exp' }}
        data={graphicData}
        width={250}
        height={250}
        colorScale={graphicColor}
        innerRadius={50}
      />

      <Button refreshing={refreshing} onPress={onRefresh}>
        <Text> Recargar </Text>
      </Button>
    </View>
  );
};

export default TestScreen;
