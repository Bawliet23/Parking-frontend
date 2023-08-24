/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

const ParkingSlot = () => {
  const [selected, setSelected] = useState(false);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 5,
        paddingTop: 5,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
      }}
      horizontal
      showsHorizontalScrollIndicator={true}>
      <View className="h-28 flex-1 mb-1 bg-black relative mr-1 ">
        <TouchableOpacity
          onPress={() => {
            setSelected(!selected);
          }}
          className={` absolute flex justify-center items-center top-0 bottom-0 left-0 right-0 ${
            selected
              ? 'bg-gradient-to-r from-indigo-500'
              : 'bg-gradient-to-r from-cyan-500 to-blue-500'
          }`}>
          {selected && <Text>Selected</Text>}
        </TouchableOpacity>
      </View>
      <View className="flex-1 h-28 mb-1 bg-black relative ml-1 ">
        <View className="bg-gradient-to-r from-cyan-500 to-blue-500 absolute top-0 bottom-0 left-0 right-0"></View>
      </View>
    </ScrollView>
  );
};

export default ParkingSlot;
