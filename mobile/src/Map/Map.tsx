import React, { useState, useEffect } from 'react';
import { Button } from 'react-native';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import {
  WebViewLeaflet,
  WebviewLeafletMessage,
  AnimationType
} from 'react-native-webview-leaflet';

import * as LocalAuthentication from 'expo-local-authentication';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const getDuration = (): number => Math.floor(Math.random() * 3) + 1;

export default function Map({ navigation }) {
  const [mapCenterPosition, setMapCenterPosition] = useState({
    lat: 51.55977,
    lng: 19.84249
  });
  const [ownPosition, setOwnPosition] = useState(null);
  const [webViewLeafletRef, setWebViewLeafletRef] = useState(null);

  const onMessageReceived = (message: WebviewLeafletMessage) => {
    switch (message.event) {
      // case WebViewLeafletEvents.ON_MAP_MARKER_CLICKED:
      //   Alert.alert(
      //     `Map Marker Touched, ID: ${message.payload.mapMarkerID || 'unknown'}`
      //   );

      //   break;
      // case WebViewLeafletEvents.ON_MAP_TOUCHED:
      //   const position: LatLngObject = message.payload
      //     .touchLatLng as LatLngObject;
      //   Alert.alert(`Map Touched at:`, `${position.lat}, ${position.lng}`);
      //   break;
      default:
        console.log('App received', message);
    }
  };

  useEffect(() => {
    getLocationAsync();
  });

  const sendLocation = async () => {
    let results = await LocalAuthentication.authenticateAsync();
    if (results.success) {
      alert('You have successfully provided your location');
      navigation.navigate('Home');
    } else {
      alert('The biometric authentication was unsuccessful');
    }
  };

  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.warn('Permission to access location was denied');
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      if (!ownPosition) {
        setOwnPosition({
          lat: location.coords.latitude,
          lng: location.coords.longitude
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        {
          <WebViewLeaflet
            ref={(ref: WebViewLeaflet) => {
              setWebViewLeafletRef(ref);
            }}
            backgroundColor={'green'}
            onMessageReceived={onMessageReceived}
            mapLayers={[
              {
                baseLayerIsChecked: true,
                baseLayerName: 'Monochrome',
                url:
                  'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
                attribution:
                  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              },
              {
                baseLayerName: 'Colors',
                url:
                  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
                attribution:
                  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              },

              {
                baseLayerName: 'Satellite',
                url:
                  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                attribution:
                  'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              }
            ]}
            mapCenterPosition={ownPosition || mapCenterPosition}
            ownPositionMarker={
              ownPosition && {
                position: ownPosition,
                icon: '📍',
                size: [32, 32],
                animation: {
                  duration: getDuration(),
                  delay: 0,
                  iterationCount: 1,
                  type: AnimationType.PULSE
                }
              }
            }
            zoom={5}
          />
        }
      </View>
      <View style={styles.bottomContainer}>
        {!ownPosition ? (
          <>
            <ActivityIndicator />
            <Text>Localizing...</Text>
          </>
        ) : (
          <Button
            title={'Check in with your location'}
            onPress={sendLocation}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    height: 60,
    backgroundColor: 'dodgerblue',
    paddingHorizontal: 10,
    paddingTop: 30,
    width: '100%'
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600'
  },
  mapControls: {
    backgroundColor: 'rgba(255,255,255,.5)',
    borderRadius: 5,
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 0,
    marginHorizontal: 10,
    padding: 7,
    position: 'absolute',
    right: 0
  },
  mapButton: {
    alignItems: 'center',
    height: 42,
    justifyContent: 'center',
    width: 42
  },
  mapButtonEmoji: {
    fontSize: 28
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
