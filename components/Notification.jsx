/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import {View, Text} from 'react-native';
import React from 'react';

const Notification = ({isVisible, notifications}) => {
  if (!isVisible) return null;
  console.log('hello in notification');

  return (
    <View className="absolute  top-[70px] px-6  h-16  w-full">
      {notifications.map((notification, index) => (
        <View
          key={index}
          className="bg-[#f1f1f1] flex  rounded-lg items-start justify-center p-2 mb-1 h-full  ">
          <Text className="text-black first-letter:uppercase font-medium text-lg">
            {notification}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default Notification;
