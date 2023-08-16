/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import {View, Text} from 'react-native';
import React from 'react';
import Home from './screens/Home';
import Details from './screens/Details';

const App = () => {
  return (
    <View className="h-full">
      <View className="h-full ">
        <Home />
        {/* <Details /> */}
      </View>
    </View>
  );
};

export default App;
