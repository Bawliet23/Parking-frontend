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
import React, {useState} from 'react';
import {
  BellAlertIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import {MapPinIcon} from 'react-native-heroicons/solid';
import ParkingCard from '../components/ParkingCard';

const Home = () => {
  const [selected, setselected] = useState(1);

  return (
    <View className="bg-white h-full w-full">
      <View className="h-2/5 bg-[#262A3A] flex">
        <View className="flex ml-3 flex-row flex-1">
          <View className="flex-1 pt-2">
            <TouchableOpacity className="flex flex-row  items-center">
              <Text className="text-gray-500 text-lg mr-1">Your Location</Text>
              <ChevronDownIcon size={15} color="gray" />
            </TouchableOpacity>
            <View className="flex flex-row items-center">
              <MapPinIcon size={17} color="#0075FE" />
              <Text className="text-white text-lg ml-1">Casablanca, Maroc</Text>
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
          <Text className="text-3xl font-bold text-white mx-3">
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
            <ParkingCard key={index} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;
