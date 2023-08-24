/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import {View, Text} from 'react-native';
import React from 'react';
import ParkingSlot from './ParkingSlot';

const ParkingArea = () => {
  return (
    <View>
      {[1, 2, 3, 4, 5].map(index => (
        <ParkingSlot key={index} />
      ))}
    </View>
  );
};

export default ParkingArea;
