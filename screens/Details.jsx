/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import {View, Text} from 'react-native';
import React from 'react';
import MapView from 'react-native-maps';
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'react-native-heroicons/outline';
import ParkingArea from '../components/ParkingArea';
const Details = () => {
  return (
    <View className="w-full h-full bg-[#0e111f]">
      <View className=" flex flex-row  h-24  w-full ">
        <View className=" flex-1  flex justify-center items-center">
          <View className=" flex justify-center items-center h-10 w-10 border-[#3F4250] rounded border-[1px]">
            <ArrowLeftIcon size={25} color="white" />
          </View>
        </View>
        <View className=" flex-1 flex align-baseline items-center justify-center ">
          <Text className="text-white text-xl font-bold">Choose Slot</Text>
        </View>
        <View className=" flex-1"></View>
      </View>

      <View className="w-full h-24 flex flex-row justify-around items-center">
        <ChevronLeftIcon size={25} color="white" />
        <View className="flex justify-center align-middle items-center">
          <Text className="text-white text-3xl font-bold">Floor 1</Text>
          <Text className=" text-gray-500 text-sm">10 Available</Text>
        </View>

        <ChevronRightIcon size={25} color="white" />
      </View>
      <View className="flex">
        <ParkingArea />
      </View>
    </View>
  );
};

export default Details;
