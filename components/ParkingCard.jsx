/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import React from 'react';
import {ChevronRightIcon} from 'react-native-heroicons/outline';

const ParkingCard = ({navigation, parking}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ParkingDetail', {parking});
      }}
      className=" w-56 h-48  px-4 mr-4 pt-1 rounded-lg  relative flex bg-white overflow-hidden">
      <View className="flex flex-row justify-between">
        <Text className=" text-black font-semibold text-lg mr-1">
          {parking.name}
        </Text>
        <TouchableOpacity className="flex flex-row  items-center">
          <ChevronRightIcon size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex flex-row mb-1 ">
        <Text className=" text-[#0073F9] font-semibold text-md">
          {parking.distance.toFixed(2)}km . ${parking.price.toFixed(2)}/h
        </Text>
      </View>
      <View className="relative w-full h-32 rounded overflow-hidden mb-4">
        <MapView
          className="absolute top-0 left-0 right-0 bottom-0  rounded"
          enableP
          region={{
            latitude: parking.lat,
            longitude: parking.lon,
            latitudeDelta: 0,
            longitudeDelta: 0.004,
          }}>
          <Marker
            coordinate={{latitude: parking.lat, longitude: parking.lon}}
          />
        </MapView>
      </View>
    </TouchableOpacity>
  );
};

export default ParkingCard;
