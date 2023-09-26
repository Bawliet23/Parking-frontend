/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {
  ArrowRightOnRectangleIcon,
  ArrowLeftIcon,
} from 'react-native-heroicons/outline';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
const Profile = () => {
  const navigation = useNavigation();
  const [isLoding, setisLoding] = useState(true);
  const [user, setUser] = useState();
  const TostMessage = () => {
    ToastAndroid.show('Edited Sucessfully !', ToastAndroid.SHORT);
  };
  const getUser = async () => {
    const value = await AsyncStorage.getItem('user');

    const user = JSON.parse(value);
    console.log(user);
    return user;
  };
  const logOut = async () => {
    await AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  };

  useEffect(() => {
    const u = getUser().then(user => {
      setUser(user);
      setisLoding(false);
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 relative bg-white">
      {isLoding ? (
        <ActivityIndicator size="large" />
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeftIcon size={25} color="black" />
            </TouchableOpacity>
            <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>
              Profile
            </Text>
            <View></View>
          </View>
          <View style={{padding: 20, alignItems: 'center'}}>
            <Image
              source={require('../assets/userProfile.png')}
              style={{width: 80, height: 80, borderRadius: 100}}
            />
          </View>
          <View style={{padding: 10}}>
            <View>
              <Text
                style={{
                  opacity: 0.5,
                  color: 'black',
                }}>
                Name
              </Text>
              <TextInput
                placeholder="name"
                defaultValue={user.name}
                placeholderTextColor={'black'}
                style={{
                  fontSize: 16,
                  color: 'black',
                  borderBottomWidth: 1,
                  borderColor: '#CDCDCD',
                  backgroundColor: '#f8f8f8',
                }}
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
            <View style={{paddingVertical: 10}}>
              <Text
                style={{
                  opacity: 0.5,
                  color: 'black',
                }}>
                Email
              </Text>
              <TextInput
                placeholder="Email"
                value={user.email}
                placeholderTextColor={'black'}
                style={{
                  fontSize: 16,
                  color: 'black',
                  borderBottomWidth: 1,
                  borderColor: '#CDCDCD',
                  backgroundColor: '#f8f8f8',
                }}
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
            <View style={{paddingVertical: 10}}>
              <Text
                style={{
                  opacity: 0.5,
                  color: 'black',
                }}>
                Adresse
              </Text>
              <TextInput
                placeholder="addr"
                value={user.addr}
                placeholderTextColor={'black'}
                style={{
                  fontSize: 16,
                  color: 'black',
                  borderBottomWidth: 1,
                  borderColor: '#CDCDCD',
                  backgroundColor: '#f8f8f8',
                }}
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
          </View>
          <View>
            <TouchableOpacity
              className="w-[80%] m-auto flex flex-row justify-center items-center mt-4 rounde-lg bg-slate-50  h-12"
              onPress={logOut}>
              <ArrowRightOnRectangleIcon size={20} color="red" />
              <Text className="ml-2 text-black ">Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Profile;
