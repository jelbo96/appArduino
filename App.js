import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { Root } from 'native-base';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from './src/HomeScreen';
import DetailsScreen from './src/DetailsScreen';
import SettingsScreen from './src/SettingsScreen';
import GraphsScreen from './src/GraphsScreen';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
    </HomeStack.Navigator>
  );
}

const DetailsStack = createStackNavigator();

function DetailsStackScreen() {
  return (
    <DetailsStack.Navigator>
      <DetailsStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Detalles' }}
      />
      <DetailsStack.Screen
        name="Graphs"
        component={GraphsScreen}
        options={({ route }) => ({ title: 'Gráficos - '.concat(route.params.sensorKey) })}
      />
    </DetailsStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Configuración' }}
      />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function App() {
  return (
    <Root>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Inicio') {
                iconName = 'ios-home';
              } else if (route.name === 'Detalles') {
                iconName = 'ios-analytics';
              } else if (route.name === 'Configuración') {
                iconName = 'ios-settings';
              } else if (route.name === 'Test') {
                iconName = 'ios-bug';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            }
          })}
          tabBarOptions={{
            activeTintColor: '#007bff',
            inactiveTintColor: '#8e8e93'
          }}
        >
          <Tab.Screen name="Inicio" component={HomeStackScreen} />
          <Tab.Screen name="Detalles" component={DetailsStackScreen} />
          <Tab.Screen name="Configuración" component={SettingsStackScreen} />
          {/*   <Tab.Screen name="Test" component={TestScreen} /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </Root>
  );
}

export default App;
