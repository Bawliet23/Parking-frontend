/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
const ParkingSlot = ({isEmpty}) => {
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
      <LinearGradient
        className="h-28 flex-1 mb-1  relative mr-1 "
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        colors={['#6366f1', 'transparent']}>
        <TouchableOpacity
          onPress={() => {
            if (isEmpty) setSelected(!selected);
          }}
          className={` absolute flex justify-center items-center top-0 bottom-0 left-0 right-0 ${
            selected
              ? 'bg-gradient-to-r from-indigo-500'
              : 'bg-gradient-to-r from-cyan-500 to-blue-500'
          }`}>
          {selected && <Text>Selected</Text>}
          {!isEmpty && (
            <Image
              className="relative w-[120px] h-[120px]"
              source={require('../assets/car.png')}
              resizeMode={'contain'}
            />
          )}
        </TouchableOpacity>
      </LinearGradient>
      <View className="flex-1 h-28 mb-1 bg-black relative ml-1 ">
        <View className="bg-gradient-to-r from-cyan-500 to-blue-500 absolute top-0 bottom-0 left-0 right-0"></View>
      </View>
    </ScrollView>
  );
};

export default ParkingSlot;
