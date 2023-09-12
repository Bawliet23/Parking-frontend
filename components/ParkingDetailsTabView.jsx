/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import ParkingInfo from './ParkingInfo';
import ImageList from './ImageList';

const ParkingDetailsTabView = ({parkingInfo, images}) => {
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();
  const [routes] = useState([
    {key: 'info', title: 'Information'},
    {key: 'images', title: 'Images'},
  ]);
  console.log(parkingInfo);
  console.log(images);

  const FirstRoute = () => <ParkingInfo info={parkingInfo} />;

  const SecondRoute = () => <ImageList images={images} />; //   };

  const renderScene = SceneMap({
    info: FirstRoute,
    images: SecondRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
    />
  );

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#0073F9',
  },
  indicator: {
    backgroundColor: 'white',
  },
});

export default ParkingDetailsTabView;
