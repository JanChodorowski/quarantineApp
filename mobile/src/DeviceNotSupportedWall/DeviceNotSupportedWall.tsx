import React from 'react';
import { View, Text } from 'react-native';

export default function DeviceNotSupported() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text style={{ fontSize: 16 }}>Your device is not supported</Text>
    </View>
  );
}
