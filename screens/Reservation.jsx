/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ticket from '../components/Ticket';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import {BACKEND_API} from '@env';
const Reservation = ({navigation}) => {
  const [user, setUser] = useState();
  const [isLoading, setisLoading] = useState(true);
  const [reservartions, setReservartions] = useState(null);

  useEffect(() => {
    const getuser = async () => {
      const v = await AsyncStorage.getItem('user');
      const u = JSON.parse(v);
      setUser(u);
      return u;
    };

    getuser().then(u => {
      const apiUrl = `${BACKEND_API}/user/${u.id}/reservations`;
      console.log(apiUrl);
      axios
        .get(apiUrl)
        .then(response => {
          // Handle the successful response here
          const res = response.data;
          console.log(res);
          setReservartions(res);
          setisLoading(false);
        })
        .catch(error => {
          // Handle any errors here
          console.error('Error:', error);
        });
    });
  }, []);

  return (
    <View className="bg-[#f7f7f7] flex-1">
      <View className="w-full justify-center px-2 items-center flex-row bg-white h-16">
        <Text className="text-lg font-bold text-black">Reservations</Text>
      </View>
      {isLoading ? (
        <View className="flex justify-center items-center flex-1">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={reservartions}
          keyExtractor={item => item.id} // Use a unique key for each item
          renderItem={({item}) => <Ticket user={user} reservation={item} />}
          style={{marginBottom: 75}}
        />
      )}
    </View>
  );
};
Reservation.navigationOptions = {
  title: 'Custom Header for Tab A', // Customize the header title
  headerStyle: {
    backgroundColor: 'blue', // Customize the header background color
  },
  headerTintColor: 'white', // Customize the header text color
};

export default Reservation;
