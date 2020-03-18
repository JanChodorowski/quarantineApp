import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import UserContext from '../contexts/user';
import * as SecureStore from 'expo-secure-store';

export default function Home({ navigation }) {
  const { user, setUser } = useContext(UserContext);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column'
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {user ? <Text>{user}</Text> : <Text>Please login </Text>}
      </View>
      <View
        style={{
          flexDirection: 'column'
        }}
      >
        {!user && (
          <Button
            title='Login using QRCode'
            onPress={() => navigation.navigate('Scanner')}
          />
        )}
        {user && (
          <>
            <Button
              title='Logout'
              onPress={async () => {
                await SecureStore.deleteItemAsync('user');
                navigation.navigate('Home');
                setUser(null);
              }}
            />
            <Button
              title='Check in'
              onPress={() => {
                navigation.navigate('Map');
              }}
            />
          </>
        )}
      </View>
    </View>
  );
}
