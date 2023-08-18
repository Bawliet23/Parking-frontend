/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import {View, Text} from 'react-native';
import React from 'react';
import Home from './screens/Home';
import Details from './screens/Details';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabScreens from './screens/TabScreens';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Tabs" component={TabScreens} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
