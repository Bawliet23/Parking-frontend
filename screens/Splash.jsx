/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import {View, Text, Image, PermissionsAndroid} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
const Splash = ({navigation}) => {
  useEffect(() => {
    const getData = async () => {
      try {
        const v = await AsyncStorage.getItem('user');
        const value = JSON.parse(v);
        console.log(value);
        if (value !== null) {
          navigation.navigate('Tabs');
        } else {
          getLocation().then(() => navigation.navigate('Login'));
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    const getLocation = async () => {
      var value = {};
      const result = requestLocationPermission();
      result.then(res => {
        if (res) {
          Geolocation.getCurrentPosition(
            async position => {
              value.lat = position.coords.latitude;
              value.lon = position.coords.longitude;
              const jsonValue = JSON.stringify(value);
              await AsyncStorage.setItem('user', jsonValue);
              Geocoder.init('AIzaSyBUDF9iyMau1IH76K7z2KVbwIPQbrpNTT0');
              Geocoder.from(position.coords.latitude, position.coords.longitude)
                .then(async json => {
                  const v = await AsyncStorage.getItem('user');
                  const user = JSON.parse(v);
                  user.addr = json.results[0].address_components[1].long_name;
                  const jsonValue = JSON.stringify(user);
                  await AsyncStorage.setItem('user', jsonValue);
                })
                .catch(error => console.warn(error));
            },
            error => {
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }
      });
    };

    getData();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err.message);
      return false;
    }
  };

  return (
    <View className="flex w-full h-full">
      <Image
        className="flex-1 w-full"
        source={require('../assets/splash.png')}
      />
    </View>
  );
};

export default Splash;
