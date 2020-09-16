import { StatusBar } from 'expo-status-bar';

import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { registerRootComponent } from 'expo';

import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/HomeScreen';
import DetailsScreen from './src/DetailsScreen';
import SettingsScreen from './src/SettingsScreen';

const Tab = createBottomTabNavigator();

function App() {
  return (
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
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}
        tabBarOptions={{
          activeTintColor: '#007bff',
          inactiveTintColor: '#8e8e93'
        }}
      >
        <Tab.Screen name="Configuración" component={SettingsScreen} />
        <Tab.Screen name="Inicio" component={HomeScreen} />
        <Tab.Screen name="Detalles" component={DetailsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
