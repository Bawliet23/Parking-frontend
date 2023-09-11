/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import {View, Text, Image, TouchableOpacity} from 'react-native';

import React, {useEffect, useState, useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
const Parking = props => {
  const [userLocation, setuserLocation] = useState(null);
  const mapRef = useRef(null);
  let id = null;
  const [destination, setdestination] = useState({
    latitude: 33.560487,
    longitude: -7.697092,
  });

  const getUserLocation = async () => {
    const value = await AsyncStorage.getItem('user');

    const user = JSON.parse(value);
    return user;
  };

  const stopTrackingLocation = () => {
    console.log('stop ' + id);
    Geolocation.clearWatch(id);
  };

  const startTrackingLocation = () => {
    console.log(' insde');
    id = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('innside start tracking');
        console.log(position);
        setuserLocation({latitude, longitude});
      },
      error => {
        console.error('Location error:', error);
      },
      {
        distanceFilter: 10,
        enableHighAccuracy: true,
        timeout: 150,
        maximumAge: 10000,
      },
    );
    console.log('id : ' + id);
  };
  useEffect(() => {
    startTrackingLocation();
    console.log('All my friends are alive');

    return () => {
      stopTrackingLocation();
    };
  }, []);

  return (
    <>
      {userLocation ? (
        <View className="flex h-full w-full">
          <MapView
            ref={mapRef}
            className="absolute top-0 left-0 right-0 bottom-0 "
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
              onReady={result => {
                const origin = {
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude,
                };
                const destination = {
                  latitude: 33.560487,
                  longitude: -7.697092,
                };

                const coordinates = [origin, destination];
                mapRef.current.fitToCoordinates(coordinates, {
                  edgePadding: {top: 50, right: 50, left: 50, bottom: 100},
                  animated: true, // You can enable animation if desired
                });
              }}
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
            {destination && (
              <Marker
                identifier="destination"
                coordinate={{
                  latitude: destination.latitude,
                  longitude: destination.longitude,
                }}
              />
            )}
          </MapView>
          <View className="absolute flex flex-row rounded-lg  bg-white h-32 left-4 right-4 bottom-6">
            <View className=" pt-2 flex-5">
              <Text className="pl-4 font-semibold  text-black text-xl">
                Parking Name
              </Text>
              <Text className="px-4 font-semibold text-gray-600 text-md">
                hay hassani casablanca
              </Text>
              <View className="pl-4 flex flex-row mb-1 ">
                <Text className=" text-[#0073F9] font-semibold text-md">
                  2.5km . $3.00/h
                </Text>
              </View>
              <View className="flex  items-end justify-center">
                <TouchableOpacity
                  onPress={() => {}}
                  className="bg-[#0073F9] flex items-center rounded-lg justify-center h-8 w-24">
                  <Text className=" text-white font-semibold text-md">Pay</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-1 flex items-center justify-center">
              <Image
                className="h-24 w-24 rounded"
                source={require('../assets/parking.jpg')}
              />
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default Parking;
