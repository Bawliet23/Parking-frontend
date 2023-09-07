/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {EyeIcon, EyeSlashIcon} from 'react-native-heroicons/outline';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({navigation}) => {
  const [email, setemail] = useState('');
  const [name, setname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
          navigation.navigate('Tabs');
        }
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);

  const loginButton = async () => {
    console.log(password + ' ' + email);
    if (!password || !email) return;
    try {
      const {data} = await axios.post(
        'http://192.168.11.101:8080/api/v1/user/signUp',
        {
          name,
          email,
          password,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('user', jsonValue);
      console.log(data);
      navigation.navigate('Tabs');
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <View className="w-full h-full flex bg-[#f8f8f8] ">
      <View className="w-full mt-8 h-24 flex justify-center items-center">
        <Image className="h-16 w-16" source={require('../assets/logo.png')} />
      </View>
      <View className="w-full pl-4">
        <Text className=" text-3xl font-bold text-black">Welcome</Text>
        <Text className=" text-lg  text-black">Please enter your details</Text>
      </View>
      <View className="w-full px-4 flex mt-4">
        <View className="flex my-2 ">
          <Text className=" text-xl text-black">Name</Text>
          <View className="w-full border-[1px] rounded-lg flex flex-row items-center bg-white px-1 py-[1px]">
            <TextInput
              className="w-full text-lg text-black"
              onChangeText={v => {
                setname(v);
              }}
              value={name}
              placeholder="Name"
              placeholderTextColor="#000"
              keyboardType="ascii-capable"
            />
          </View>
        </View>
        <View className="flex my-2 ">
          <Text className=" text-xl text-black">Email</Text>
          <View className="w-full border-[1px] rounded-lg flex flex-row items-center bg-white px-1 py-[1px]">
            <TextInput
              className="w-full text-lg text-black"
              onChangeText={v => {
                setemail(v);
              }}
              value={email}
              placeholder="Email"
              placeholderTextColor="#000"
              keyboardType="email-address"
            />
          </View>
        </View>
        <View className="flex my-2">
          <Text className=" text-xl  text-black">Password</Text>
          <View className="w-full border-[1px] rounded-lg flex flex-row items-center bg-white  px-1 py-[1px]">
            <TextInput
              className="flex-1 text-black text-lg"
              onChangeText={value => {
                setPassword(value);
              }}
              placeholderTextColor="#000"
              value={password}
              placeholder="Password"
              secureTextEntry={passwordVisibility}
            />

            <Pressable
              onPress={() => setPasswordVisibility(!passwordVisibility)}>
              {passwordVisibility ? (
                <EyeIcon size={20} color="#333" />
              ) : (
                <EyeSlashIcon size={20} color="#333" />
              )}
            </Pressable>
          </View>
        </View>
      </View>
      <View className="flex h-30  w-full px-4 my-4">
        <Pressable
          className="h-14 w-full shadow-sm bg-[#1570EF] flex items-center justify-center mb-4 rounded-xl"
          onPress={loginButton}>
          <Text className="text-white text-lg">Sign Up</Text>
        </Pressable>
        <Pressable
          className="h-14 w-full shadow-xl bg-white flex-row font-semibold flex items-center justify-center rounded-xl"
          onPress={() => {}}>
          <Image
            className="h-10 w-10"
            source={require('../assets/google.png')}
          />
          <Text className="text-black font-semibold text-lg">
            Sign up with google
          </Text>
        </Pressable>
      </View>
      <View className=" w-full flex-1 justify-start items-center flex">
        <Text className="text-black  text-lg">Dont have an account?</Text>
        <Pressable
          className="h-12 border-[1px] w-40 shadow-xl bg-white font-semibold flex items-center justify-center rounded-xl"
          onPress={() => navigation.navigate('Register')}>
          <Text className="text-black font-semibold text-lg">Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Register;
