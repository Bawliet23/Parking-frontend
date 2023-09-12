/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ArrowLeftIcon,
  MapPinIcon,
  GlobeAltIcon,
  ClockIcon,
  LanguageIcon,
  CheckBadgeIcon,
  PlayIcon,
  PauseIcon,
  BookmarkIcon,
} from 'react-native-heroicons/solid';
import Rating from '../components/Rating';
import ParkingDetailsTabView from '../components/ParkingDetailsTabView';
import ParkingInfo from '../components/ParkingInfo';

const ParkingDetails = () => {
  const navigation = useNavigation();

  const [isLoding, setisLoding] = useState(true);

  // const togglePlaying = useCallback(() => {
  //   setPlaying((prev) => !prev);
  // }, []);
  const images = [
    'https://webbox.imgix.net/images/fkasnjcmlhnbwpkv/ac1975e4-f8ee-4b5c-b76d-321325562de3.jpg?auto=format,compress&fit=crop&crop=entropy',
    'https://www.magnetic-access.com/files/data/sectors/parking/Parken_1280x989px.jpg',
    'https://www.magnetic-access.com/files/data/sectors/parking/Parken_1280x989px.jpg',
  ];

  const {
    params: {parking},
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    setisLoding(false);
  }, []);

  return (
    <SafeAreaView className="flex-1 relative bg-white">
      {isLoding ? (
        <ActivityIndicator size="large" />
      ) : (
        <View className="flex-1">
          <Image
            source={require('../assets/parking.jpg')}
            className="w-full h-80 bg-gray-300 p-4 "
          />
          <View className="bg-white rounded-tr-xl rounded-tl-lg mt-[-15px] pl-2 pt-2">
            <Text className="text-2xl font-bold mb-3  text-gray-700 ">
              {parking.name}
            </Text>
            <View className="flex flex-row ">
              <Rating />
              <Text className="text-md pl-2 text-[#ccc] ">(4)</Text>
            </View>

            <View className="flex flex-row">
              <Text className="text-md pl-2 text-[#25a771] ">Open</Text>
              <Text className="text-md pl-2 text-[#ccc] ">9pm to 11am</Text>
            </View>
            <View className="flex flex-row items-center justify-center w-full mt-4">
              <TouchableOpacity
                onPress={() => {}}
                className="w-20 h-20 py-4 px-2 mr-4 rounded-xl flex justify-around align-middle items-center bg-gray-100 ">
                <MapPinIcon size={25} color="black" />
                <Text className="text-black ">Directions</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {}}
                className="w-20 h-20 py-4 px-2 mr-4 rounded-xl flex justify-around align-middle items-center bg-gray-100 ">
                <BookmarkIcon size={25} color="black" />
                <Text className="text-black ">Bookmark</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                className="w-20 h-20 py-4 px-2 mr-4 rounded-xl flex justify-around align-middle items-center bg-gray-100 ">
                <BookmarkIcon size={25} color="black" />
                <Text className="text-black ">Bookmark</Text>
              </TouchableOpacity>
            </View>
            <View className="w-full h-52 bg-cyan-400">
              <ParkingDetailsTabView parkingInfo={parking} images={images} />
              {/* <ParkingInfo info={parking} /> */}
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#2291F1',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20,
  },
});

export default ParkingDetails;
