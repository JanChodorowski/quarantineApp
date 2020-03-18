import React, { useState, useEffect } from 'react';
import DeviceNotSupportedWall from './src/DeviceNotSupportedWall/DeviceNotSupportedWall';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';

import UserContext from './src/contexts/user';

import Home from './src/Home/Home';
import Map from './src/Map/Map';
import Scanner from './src/Scanner/Scanner';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [deviceSupportsBiometrics, setDeviceSupportsBiometrics] = useState(
    false
  );
  const [
    deviceHasBiometricsConfigured,
    setDeviceHasBiometricsConfigured
  ] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setDeviceSupportsBiometrics(
          await LocalAuthentication.hasHardwareAsync()
        );

        setDeviceHasBiometricsConfigured(
          await LocalAuthentication.isEnrolledAsync()
        );
      } catch (err) {
        console.log(err);
      }
    })();
  });

  useEffect(() => {
    (async () => {
      const userFromStorage = await SecureStore.getItemAsync('user');
      if (userFromStorage) {
        setUser(userFromStorage);
      }
    })();
  }, user);

  return !deviceSupportsBiometrics || !deviceHasBiometricsConfigured ? (
    <DeviceNotSupportedWall />
  ) : (
    <UserContext.Provider value={{ user, setUser: setUser }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Map' component={Map} />
          <Stack.Screen name='Scanner' component={Scanner} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
