import React from 'react';
import { StyleSheet } from 'react-native';

import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';

import Graph from './Graph';

const GraphsScren = ({ route }) => {
  const { sensorKey } = route.params;
  return (
    <Container>
      <Tabs tabBarUnderlineStyle={{ borderBottomWidth: 4, borderBottomColor: '#007bff' }}>
        <Tab
          heading={
            <TabHeading style={styles.tabHeading}>
              <Text style={styles.tabTextHeading}>Hora</Text>
            </TabHeading>
          }
        >
          <Graph sensorKey={sensorKey} tab="hora" />
        </Tab>
        <Tab
          heading={
            <TabHeading style={styles.tabHeading}>
              <Text style={styles.tabTextHeading}>Día</Text>
            </TabHeading>
          }
        >
          <Graph sensorKey={sensorKey} tab="dia" />
        </Tab>
        <Tab
          heading={
            <TabHeading style={styles.tabHeading}>
              <Text style={styles.tabTextHeading}>Semana</Text>
            </TabHeading>
          }
        >
          <Graph sensorKey={sensorKey} tab="semana" />
        </Tab>
      </Tabs>
    </Container>
  );
};

const styles = StyleSheet.create({
  tabHeading: {
    backgroundColor: '#f2f2f2'
  },
  tabTextHeading: {
    color: 'black'
  }
});

export default GraphsScren;
