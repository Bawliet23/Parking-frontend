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
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {
  BellAlertIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import {MapPinIcon} from 'react-native-heroicons/solid';
import axios from 'axios';
import ParkingCard from '../components/ParkingCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Notification from '../components/Notification';

import {BACKEND_API, WS_URL} from '@env';

const Home = ({navigation}) => {
  const [selected, setselected] = useState(-1);
  const [user, setUser] = useState(null);
  const [parkings, setparkings] = useState([]);
  const [vehicule, setvehicule] = useState(null);
  const [addr, setaddr] = useState(null);
  const placesAutocompleteRef = useRef(null);
  var ws = React.useRef(new WebSocket(`${WS_URL}`)).current;
  const [notifications, setNotifications] = useState([
    'hello to our amazin app',
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const getParkings = async () => {
    if (!addr && !vehicule) {
      const lo = {
        lat: user.lat,
        lon: user.lon,
      };
      axios
        .get(`${BACKEND_API}/parking/nearest`, {params: lo})
        .then(function (response) {
          setparkings(response.data);
        })
        .catch(function (error) {
          console.error(error.message);
        });
      placesAutocompleteRef.current?.setAddressText(''); // Clear the input value
      placesAutocompleteRef.current?.blur();
    } else {
      axios
        .get(`${BACKEND_API}/parking/filter`, {
          params: {
            addr,
            vehicule,
          },
        })
        .then(function (response) {
          setparkings(response.data);
        })
        .catch(function (error) {
          console.error(error.message);
        });
    }
  };
  useEffect(() => {
    const getuser = async () => {
      const v = await AsyncStorage.getItem('user');
      const u = JSON.parse(v);
      setUser(u);
    };
    getuser();
  }, []);

  useEffect(() => {
    console.log(ws);
    const subscriptionMessage = {
      destination: '/notification',
      action: 'subscribe',
    };
    ws.addEventListener('open', event => {
      console.log('addEventListener');
      ws.send(JSON.stringify(subscriptionMessage));
    });
    ws.onopen = () => {
      // connection opened
      console.log('onOpen');
      ws.send(JSON.stringify(subscriptionMessage));
    };

    ws.onmessage = e => {
      // a message was received
      console.log(e.data);
    };

    ws.onerror = e => {
      // an error occurred
      console.log(e.message);
    };

    ws.onclose = e => {
      // connection closed
      console.log(e.code, e.reason);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  useEffect(() => {
    getParkings();
  }, [user, addr, vehicule]);

  return (
    <>
      {user ? (
        <View className="bg-white h-full w-full">
          <View className="h-2/5 bg-[#0e111f] visible flex">
            <View className="flex ml-3 flex-row flex-1">
              <View className="flex-1 pt-2">
                <TouchableOpacity className="flex flex-row   items-center">
                  <Text className="text-gray-500 text-lg mr-1">
                    Your Location
                  </Text>
                  <ChevronDownIcon size={15} color="gray" />
                </TouchableOpacity>
                <View className="flex flex-row items-center">
                  <MapPinIcon size={17} color="#0075FE" />
                  <Text className="text-white text-lg ml-1">{user.addr}</Text>
                </View>
              </View>
              <View className="w-20 relative">
                <TouchableOpacity
                  onPress={toggleNotifications}
                  className="h-10 flex justify-center items-center w-10 m-auto border-[1px] border-gray-400 rounded relative">
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
            <View className="flex flex-1 items-center visible">
              <GooglePlacesAutocomplete
                ref={placesAutocompleteRef}
                placeholder="Search"
                textInputProps={{
                  placeholderTextColor: '#333',
                  returnKeyType: 'search',
                }}
                returnKeyType={'search'}
                renderTextInput={props => (
                  <TextInput
                    {...props}
                    onBlur={() => {
                      // Handle onBlur event here
                      console.log('Input field blurred');
                      // You can perform any additional actions you need when the input field blurs
                    }}
                  />
                )}
                onFail={error => console.log(error)}
                onNotFound={() => console.log('no results')}
                listEmptyComponent={() => (
                  <View style={{flex: 1}}>
                    <Text>No results were found</Text>
                  </View>
                )}
                styles={{
                  container: {
                    // position: 'absolute',
                    flex: 1,
                    width: '80%',
                    height: '100%',
                    marginVertical: 'auto',
                    overflow: 'visible',
                  },
                  description: {
                    color: 'black',
                    fontSize: 18,
                  },
                  textInputContainer: {
                    color: 'black',
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb',
                  },
                  listView: {
                    color: 'black',
                  },
                  textInput: {
                    fontSize: 18,
                    color: 'black',
                  },
                }}
                // className="border-2 border-gray-400 rounded w-[80%] h-[50%] mx-auto flex items-center flex-row"
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  console.log(details.address_components[0].long_name);
                  setaddr(details.address_components[0].long_name);
                }}
                fetchDetails={true}
                query={{
                  key: 'AIzaSyBUDF9iyMau1IH76K7z2KVbwIPQbrpNTT0',
                  language: 'en',
                }}
                debounce={400}
                // currentLocation={true}
              />
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
                {['CAR', 'MOTO', 'TRACK', 'BIKE'].map((value, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      if (selected === index) {
                        setselected(-1);
                        setvehicule(null);
                      } else {
                        setselected(index);
                        setvehicule(value);
                      }
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
                    <Text className="text-black mt-[-10px]">{value}</Text>
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
              {parkings.map(parking => (
                <ParkingCard
                  navigation={navigation}
                  key={parking.id}
                  parking={parking}
                />
              ))}
            </ScrollView>
          </View>
          <Notification
            isVisible={showNotifications}
            notifications={notifications}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  fnt: {
    fontFamily: 'Netflix Sans',
  },
});

export default Home;
