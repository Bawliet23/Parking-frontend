/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import MapView from 'react-native-maps';
import React from 'react';

const ParkingCard = () => {
  return (
    <View
      onPress={() => {}}
      className="w-40 h-40  px-2 mr-4 rounded-lg relative flex bg-gray-100">
      <MapView
        className="absolute top-0 left-0 right-0 bottom-0"
        region={{
          latitude: 33.5828236,
          longitude: -7.6435475,
          latitudeDelta: 0,
          longitudeDelta: 0.04,
        }}
      />
    </View>
  );
};

export default ParkingCard;
