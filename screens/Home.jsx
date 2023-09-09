/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  BellAlertIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import {MapPinIcon} from 'react-native-heroicons/solid';
import ParkingCard from '../components/ParkingCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
const Home = ({navigation}) => {
  const [selected, setselected] = useState(1);
  const [address, setaddress] = useState('');
  useEffect(() => {
    // requestLocationPermission();
    getLocation();
  }, []);

  const getLocation = async () => {
    const v = await AsyncStorage.getItem('user');
    const value = JSON.parse(v);
    console.log(typeof JSON.parse(v));
    console.log(v);
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          async position => {
            value.lat = position.coords.latitude;
            value.lon = position.coords.longitude;
            console.log(value);
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('user', jsonValue);
            Geocoder.init('AIzaSyBUDF9iyMau1IH76K7z2KVbwIPQbrpNTT0');

            Geocoder.from(position.coords.latitude, position.coords.longitude)
              .then(json => {
                var addressComponent =
                  json.results[0].address_components[1].long_name;
                setaddress(addressComponent);
              })
              .catch(error => console.warn(error));
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            console.log(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

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
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      console.log(err.message);
      return false;
    }
  };
  return (
    <View className="bg-white h-full w-full">
      <View className="h-2/5 bg-[#0e111f] flex">
        <View className="flex ml-3 flex-row flex-1">
          <View className="flex-1 pt-2">
            <TouchableOpacity className="flex flex-row  items-center">
              <Text className="text-gray-500 text-lg mr-1">Your Location</Text>
              <ChevronDownIcon size={15} color="gray" />
            </TouchableOpacity>
            <View className="flex flex-row items-center">
              <MapPinIcon size={17} color="#0075FE" />
              <Text className="text-white text-lg ml-1">{address}</Text>
            </View>
          </View>
          <View className="w-20 relative">
            <TouchableOpacity className="h-10 flex justify-center items-center w-10 m-auto border-[1px] border-gray-400 rounded relative">
              <Text className="absolute bg-red-500 rounded-full w-[20px] h-[20px] text-[12px] p-[2px] right-[-10px] text-center top-[-10px]">
                3
              </Text>
              <BellAlertIcon size={25} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-1">
          <Text className="text-3xl font-bold text-white mx-3 font-tiltPrism">
            Let's find the best parking space
          </Text>
        </View>
        <View className="flex flex-1 ">
          <View className="border-2 border-gray-400 rounded w-[80%] h-[50%] mx-auto flex items-center flex-row">
            <TextInput
              className=" h-full w-[80%] p-3"
              placeholder="Find Parking Area..."
              value=""
            />
            <View className="flex-1 flex justify-center items-center">
              <MagnifyingGlassIcon size={25} color="white" />
            </View>
          </View>
        </View>
      </View>
      <View className="h-1/5 bg-white">
        <View className="ml-3">
          <Text className="text-black text-lg font-medium">
            Your Transpotation
          </Text>
          <ScrollView
            contentContainerStyle={{paddingHorizontal: 15, paddingTop: 10}}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {[1, 2, 3, 4, 5, 6, 8].map(index => (
              <TouchableOpacity
                onPress={() => {
                  console.log(index);
                  setselected(index);
                }}
                key={index}
                className={`"w-20 h-24 px-2 mr-4 rounded-lg flex justify-center align-middle items-center bg-gray-100 ${
                  selected === index ? 'border-[3px] border-blue-500' : ''
                }`}>
                <Image
                  className="w-[70px] h-[70px]"
                  source={require('../assets/car.png')}
                  resizeMode={'contain'}
                />
                <Text className="text-black mt-[-10px]">Car</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <View className="h-2/5 pl-3 bg-[#f7f7f7]">
        <Text className="text-black text-lg font-medium">Recent Place</Text>
        <ScrollView
          contentContainerStyle={{paddingHorizontal: 15, paddingTop: 10}}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {[1, 2, 3, 4, 5, 6, 8].map(index => (
            <ParkingCard navigation={navigation} key={index} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fnt: {
    fontFamily: 'Netflix Sans',
  },
});

export default Home;
