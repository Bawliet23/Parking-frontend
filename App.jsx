/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import {View, Text, PermissionsAndroid} from 'react-native';
import React, {useEffect} from 'react';
import Home from './screens/Home';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabScreens from './screens/TabScreens';
import Parking from './screens/Parking';
import SplashScreen from 'react-native-splash-screen';
import Login from './screens/Login';
import Register from './screens/Register';
import Splash from './screens/Splash';
import ParkingDetail from './screens/ParkingDetail';

import {YOUR_STRIPE_PUBLISHABLE_KEY} from '@env';
import {StripeProvider} from '@stripe/stripe-react-native';
const App = () => {
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    // requestLocationPermission();
    SplashScreen.hide();
    // getLocation();
  }, []);

  return (
    <StripeProvider publishableKey={`${YOUR_STRIPE_PUBLISHABLE_KEY}`}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ParkingDetail" component={ParkingDetail} />
          <Stack.Screen name="Tabs" component={TabScreens} />
          <Stack.Screen name="Parking" component={Parking} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
};

export default App;
