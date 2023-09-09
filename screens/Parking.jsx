/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import {View, Text} from 'react-native';

import React, {useEffect, useState, useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapViewDirections from 'react-native-maps-directions';
const Parking = props => {
  const [userLocation, setuserLocation] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const getUserLocation = async () => {
      const value = await AsyncStorage.getItem('user');
      const user = JSON.parse(value);
      setuserLocation({
        latitude: user.lat,
        longitude: user.lon,
      });
      // console.log(userLocation.lat);
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    if (!userLocation) return;
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: {top: 50, right: 50, left: 50, bottom: 50},
    });
  }, [userLocation]);

  const destination = {latitude: 33.560487, longitude: -7.697092};
  return (
    <>
      {userLocation ? (
        <View className="flex h-full w-full">
          <MapView
            ref={mapRef}
            className="absolute top-0 left-0 right-0 bottom-0  rounded"
            region={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}>
            <MapViewDirections
              origin={userLocation}
              destination={destination}
              strokeWidth={3}
              apikey={'AIzaSyBUDF9iyMau1IH76K7z2KVbwIPQbrpNTT0'}
            />
            {userLocation && (
              <Marker
                identifier="origin"
                coordinate={{
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude,
                }}
              />
            )}
            <Marker
              identifier="destination"
              coordinate={{
                latitude: destination.latitude,
                longitude: destination.longitude,
              }}
            />
          </MapView>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default Parking;
