/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  HomeIcon,
  UserIcon,
  TicketIcon,
  MapIcon,
} from 'react-native-heroicons/outline';
import Discovery from './Parking';
import Home from './Home';
import Parking from './Parking';

const TabScreens = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: () => <HomeIcon size={20} color="blue" />,
          tabBarShowLabel: false,
        }}
      />

      <Tab.Screen
        name="Tickets"
        component={Parking}
        options={{
          title: 'Tickets',
          tabBarIcon: () => <TicketIcon size={20} color="blue" />,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Map"
        component={Parking}
        options={{
          title: 'Map',
          tabBarIcon: () => <MapIcon size={20} color="blue" />,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Parking}
        options={{
          title: 'Profile',
          tabBarIcon: () => <UserIcon size={20} color="blue" />,
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabScreens;
