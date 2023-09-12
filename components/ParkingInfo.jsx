/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ParkingInfo = ({info}) => {
  console.log('infooooooo');
  console.log(info);

  return (
    <View className="bg-cyan-300">
      <Text style={styles.label}>Parking Name:</Text>
      <Text style={styles.text}>{info.name}</Text>
      <Text style={styles.label}>Location:</Text>
      <Text style={styles.text}>{info.addr}</Text>
      <Text style={styles.label}>Price per Hour:</Text>
      <Text style={styles.text}>${info.price}</Text>
      {/* Add more information fields as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
});

export default ParkingInfo;
