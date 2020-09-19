import React from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';
/* import Tab1 from './tabOne';
import Tab2 from './tabTwo';
import Tab3 from './tabThree'; */

const GraphsScren = (props) => {
  return (
    <Container>
      <Header hasTabs />
      <Tabs>
        <Tab
          heading={
            <TabHeading>
              <Icon name="camera" />
              <Text>Camera</Text>
            </TabHeading>
          }
        >
          {/* <Tab1 /> */}
          <Text> Tab1 </Text>
        </Tab>
        <Tab
          heading={
            <TabHeading>
              <Text>No Icon</Text>
            </TabHeading>
          }
        >
          {/*   <Tab2 /> */}
          <Text> Tab2 </Text>
        </Tab>
        <Tab
          heading={
            <TabHeading>
              <Icon name="apps" />
            </TabHeading>
          }
        >
          {/*  <Tab3 /> */}
          <Text> Tab3 </Text>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default GraphsScren;
