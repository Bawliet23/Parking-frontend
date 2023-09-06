/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import {View, Text} from 'react-native';
import React from 'react';
import ParkingSlot from './ParkingSlot';

const ParkingArea = () => {
  const areas = [
    {
      id: 1,
      isEmpty: true,
    },
    {
      id: 2,
      isEmpty: false,
    },
    {
      id: 3,
      isEmpty: false,
    },
    {
      id: 4,
      isEmpty: true,
    },
  ];
  return (
    <View>
      {areas.map(index => (
        <ParkingSlot key={index.id} isEmpty={index.isEmpty} />
      ))}
    </View>
  );
};

export default ParkingArea;
