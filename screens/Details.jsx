/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import {View, Text} from 'react-native';
import React from 'react';
import MapView from 'react-native-maps';

const Details = () => {
  return (
    <MapView
      className="absolute top-0 left-0 right-0 bottom-0"
      region={{
        latitude: 33.5828236,
        longitude: -7.6435475,
        latitudeDelta: 0.004,
        longitudeDelta: 1,
      }}
    />
  );
};

export default Details;
