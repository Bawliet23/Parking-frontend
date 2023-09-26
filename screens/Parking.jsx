/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import {View, Text, Image, TouchableOpacity} from 'react-native';

import React, {useEffect, useState, useRef, useLayoutEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import {err} from 'react-native-svg/lib/typescript/xml';

const Parking = ({route, navigation}) => {
  const [userLocation, setuserLocation] = useState(null);
  const mapRef = useRef(null);
  let id = null;
  const [destination, setdestination] = useState();
  const [parking, setparking] = useState(null);
  const [user, setUser] = useState(null);

  const stopTrackingLocation = () => {
    Geolocation.clearWatch(id);
  };

  const startTrackingLocation = async () => {
    console.log(' insde');
    id = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
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
  };
  useEffect(() => {
    console.log(route.params);
    const parking = route.params.parking;
    const u = route.params.user;
    setUser(u);
    setparking(parking);
    setdestination({
      latitude: parking.lat,
      longitude: parking.lon,
    });
    const origin = {
      latitude: u.lat,
      longitude: u.lon,
    };
    console.log('fiiiiiiiinek');

    // const coordinates = [origin, destination];
    // mapRef.current.fitToCoordinates(coordinates, {
    //   edgePadding: {top: 50, right: 50, left: 50, bottom: 100},
    //   animated: true,
    // });
    startTrackingLocation();

    return () => {
      stopTrackingLocation();
    };
  }, []);

  return (
    <>
      {userLocation ? (
        <View className="flex h-full w-full">
          <MapView
            mapType="standard"
            ref={mapRef}
            className="absolute top-0 left-0 right-0 bottom-0 "
            region={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}>
            {destination && (
              <MapViewDirections
                origin={userLocation}
                destination={destination}
                strokeWidth={5}
                apikey={'AIzaSyBUDF9iyMau1IH76K7z2KVbwIPQbrpNTT0'}
              />
            )}
            {userLocation && (
              <Marker
                pinColor={'#000000'}
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
                {parking.name}
              </Text>
              <Text className="px-4 font-semibold text-gray-600 text-md">
                {parking.addr}
              </Text>
              <View className="pl-4 flex flex-row mb-1 ">
                <Text className=" text-[#0073F9] font-semibold text-md">
                  {parking.distance.toFixed(2)}km . ${parking.price.toFixed(2)}
                  /h
                </Text>
              </View>
              <View className="flex  items-end justify-center">
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ParkingDetail', {parking});
                  }}
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
