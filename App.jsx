/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import {View, Text, PermissionsAndroid} from 'react-native';
import React, {useEffect} from 'react';
import Home from './screens/Home';
import Geolocation from 'react-native-geolocation-service';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabScreens from './screens/TabScreens';
import Parking from './screens/Parking';
import SplashScreen from 'react-native-splash-screen';
import Login from './screens/Login';

const App = () => {
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    // requestLocationPermission();
    SplashScreen.hide();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Tabs" component={TabScreens} />
        <Stack.Screen name="Parking" component={Parking} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
