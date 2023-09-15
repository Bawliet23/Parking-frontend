/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
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
  PhoneIcon,
  BookmarkIcon,
} from 'react-native-heroicons/solid';
import Rating from '../components/Rating';
import ParkingDetailsTabView from '../components/ParkingDetailsTabView';
import DatePicker from 'react-native-date-picker';
import ParkingInfo from '../components/ParkingInfo';
import MapView, {Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ParkingDetails = () => {
  const navigation = useNavigation();
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [user, setuser] = useState();

  const [isLoding, setisLoding] = useState(true);

  const handleReservation = () => {
    const timeDifferenceMs = checkOut.getTime() - checkIn.getTime();

    const hoursDifference = timeDifferenceMs / (1000 * 60 * 60);

    const totalPrice = hoursDifference * parking.price;

    console.log('Start Date and Time:', checkIn);
    console.log('Checkout Date and Time:', checkOut);
    console.log('Total Price:', totalPrice.toFixed(2));
    const requestData = {
      userId: user.id,
      parkingId: parking.id,
      startTime: checkIn,
      endTime: checkOut,
      price: totalPrice,
    };
    console.log(requestData);
    const headers = {
      'Content-Type': 'application/json', // Set the content type to JSON
    };

    // Define the API endpoint URL
    const apiUrl = `http://192.168.11.103:8080/api/v1/parking/reserve`; // Replace with your actual API URL

    // Make the POST request
    axios
      .post(apiUrl, null, {params: requestData})
      .then(response => {
        // Handle the success response here
        console.log('Reservation created successfully:', response.data);
      })
      .catch(error => {
        // Handle any errors here
        console.error('Error creating reservation:', error);
      });
  };

  const options = {
    weekday: 'short', // Display the short weekday name (e.g., Wed)
    day: '2-digit', // Display the day as a two-digit number (e.g., 13)
    hour: '2-digit', // Display the hour as a two-digit number (e.g., 02)
    minute: '2-digit', // Display the minute as a two-digit number (e.g., 00)
    hour12: false, // Use 12-hour format (e.g., am/pm)
  };

  const {
    params: {parking},
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const getuser = async () => {
      const v = await AsyncStorage.getItem('user');
      const u = JSON.parse(v);
      setuser(u);
    };

    getuser().then(() => setisLoding(false));
  }, []);

  return (
    <SafeAreaView className="flex-1 relative bg-white">
      {isLoding ? (
        <ActivityIndicator size="large" />
      ) : (
        <View className="relative h-72">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-10 left-4 z-10 bg-[#020C24]  p-2 rounded-xl">
            <ArrowLeftIcon size={20} color="white" />
          </TouchableOpacity>
          <Image
            source={require('../assets/parking.jpg')}
            className="w-full h-72 bg-gray-300 p-4 "
          />
          <View>
            <View className="flex flex-row bg-white rounded-tr-xl rounded-tl-lg mt-[-15px] pt-2">
              <View className="bg-white rounded-tr-xl rounded-tl-lg  pt-2">
                <Text className="text-2xl pl-2 font-bold  text-gray-700 ">
                  {parking.name}
                </Text>
                <View className="flex pl-2 flex-row ">
                  <Rating />
                  <Text className="text-md pl-2 text-[#ccc] ">(4)</Text>
                </View>

                <View className="flex flex-row">
                  <Text className="text-md pl-2 text-[#25a771] ">Open</Text>
                  <Text className="text-md pl-2 text-[#ccc] ">9pm to 11am</Text>
                </View>
              </View>
              <View className="flex justify-center items-end pr-4 mt-8  flex-1">
                <Text className="text-black text-xl font-semibold">
                  {parking.price.toFixed(2)}$/h
                </Text>
                <View className="flex flex-row">
                  <Text className="text-md pl-2 text-[#ccc] ">
                    {parking.addr}
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex flex-row items-center justify-center w-full mt-4">
              <TouchableOpacity
                onPress={() => navigation.navigate('Parking', {parking})}
                className="w-28 h-14 flex-row py-4 px-2 mr-4 rounded-xl flex justify-around align-middle items-center bg-gray-100 ">
                <MapPinIcon size={25} color="black" />
                <Text className="text-black ">Directions</Text>
              </TouchableOpacity>
              <DatePicker
                modal
                open={open1}
                date={checkOut}
                onConfirm={date => {
                  setOpen1(false);
                  setCheckOut(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
              <DatePicker
                modal
                open={open}
                date={checkIn}
                onConfirm={date => {
                  setOpen(false);
                  setCheckIn(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />

              <TouchableOpacity
                onPress={() => {}}
                className="w-28 h-14 py-4 px-2 mr-4 rounded-xl flex flex-row justify-center align-middle items-center bg-gray-100 ">
                <PhoneIcon size={25} color="black" />
                <Text className="text-black ">Call</Text>
              </TouchableOpacity>
            </View>

            <View className="flex flex-row m-2">
              <View className=" flex flex-1 pl-1 mx-1">
                <Text className="text-lg text-gray-400">Check In:</Text>
                <TouchableOpacity
                  onPress={() => setOpen(true)}
                  className="text-lg justify-center items-center h-12 text-black border-[1px] rounded-md border-gray-400">
                  <Text className="text-lg text-black">
                    {checkIn.toLocaleString('en-US', options)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View className=" flex flex-1">
                <Text className="text-lg text-gray-400">Check Out:</Text>

                <TouchableOpacity
                  onPress={() => setOpen1(true)}
                  className="text-lg h-12 justify-center items-center text-black border-[1px] rounded-md border-gray-400">
                  <Text className="text-lg text-black">
                    {checkOut.toLocaleString('en-US', options)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleReservation}
              className="mx-4 w-88 h-12 rounded-lg mb-1 flex justify-center items-center bg-[#0e111f]">
              <Text style={styles.reserveButtonText}>Reserve Parking</Text>
            </TouchableOpacity>
            <View className="relative w-full h-48 rounded overflow-hidden mb-4">
              {/* <ParkingDetailsTabView parkingInfo={parking} images={images} /> */}
              {/* <ParkingInfo info={parking} /> */}
              <MapView
                className="absolute top-0 left-0 right-0 bottom-0  rounded"
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
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
  },
  reserveButton: {
    backgroundColor: '#0073F9',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  reserveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ParkingDetails;
