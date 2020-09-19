import React from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';

import TestScreen from './TestScreen';
/* import Tab1 from './tabOne';
import Tab2 from './tabTwo';
import Tab3 from './tabThree'; */

const GraphsScren = ({ route }) => {
  const { sensorKey } = route.params;
  return (
    <Container>
      {/* <Header hasTabs /> */}
      <Tabs>
        <Tab
          heading={
            <TabHeading>
              <Text>Hora</Text>
            </TabHeading>
          }
        >
          <TestScreen sensorKey={sensorKey} tab="hora" />
          {/*  <Text> Esta viendo el sensor - {sensorKey} </Text> */}
        </Tab>
        <Tab
          heading={
            <TabHeading>
              <Text>Día</Text>
            </TabHeading>
          }
        >
          <TestScreen sensorKey={sensorKey} tab="dia" />
        </Tab>
        <Tab
          heading={
            <TabHeading>
              <Text>Semana</Text>
            </TabHeading>
          }
        >
          <TestScreen sensorKey={sensorKey} tab="semana" />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default GraphsScren;
