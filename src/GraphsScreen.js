import React from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';

import GraphTest from './GraphTest';
/* import Tab1 from './tabOne';
import Tab2 from './tabTwo';
import Tab3 from './tabThree'; */

const GraphsScren = ({ route }) => {
  const { sensorKey } = route.params;
  return (
    <Container>
      <Tabs tabBarUnderlineStyle={{ borderBottomWidth: 4, borderBottomColor: '#007bff' }}>
        <Tab
          heading={
            <TabHeading style={{ backgroundColor: '#f2f2f2' }}>
              <Text style={{ color: 'black' }}>Hora</Text>
            </TabHeading>
          }
        >
          <GraphTest sensorKey={sensorKey} tab="hora" />
        </Tab>
        <Tab
          heading={
            <TabHeading style={{ backgroundColor: '#f2f2f2' }}>
              <Text style={{ color: 'black' }}>Día</Text>
            </TabHeading>
          }
        >
          <GraphTest sensorKey={sensorKey} tab="dia" />
        </Tab>
        <Tab
          heading={
            <TabHeading style={{ backgroundColor: '#f2f2f2' }}>
              <Text style={{ color: 'black' }}>Semana</Text>
            </TabHeading>
          }
        >
          <GraphTest sensorKey={sensorKey} tab="semana" />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default GraphsScren;
