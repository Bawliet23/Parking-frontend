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

const ParkingCard = ({navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Parking');
      }}
      className=" w-56 h-48  px-4 mr-4 pt-1 rounded-lg  relative flex bg-white overflow-hidden">
      <View className="flex flex-row justify-between">
        <Text className=" text-black font-semibold text-lg mr-1">
          Your Location
        </Text>
        <TouchableOpacity className="flex flex-row  items-center">
          <ChevronRightIcon size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex flex-row mb-1 ">
        <Text className=" text-[#0073F9] font-semibold text-md">
          2.5km . $3.00/h
        </Text>
      </View>
      <View className="relative bg-red-500 w-full h-32 rounded overflow-hidden mb-4">
        <MapView
          className="absolute top-0 left-0 right-0 bottom-0  rounded"
          region={{
            latitude: 33.5828236,
            longitude: -7.6435475,
            latitudeDelta: 0,
            longitudeDelta: 0.004,
          }}>
          <Marker coordinate={{latitude: 33.5828236, longitude: -7.6435475}} />
        </MapView>
      </View>
    </TouchableOpacity>
  );
};

export default ParkingCard;
