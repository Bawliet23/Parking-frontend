/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import {View, Text, Button, StyleSheet} from 'react-native';
import React from 'react';
import PaymentForm from './PaymentForm';
import LinearGradient from 'react-native-linear-gradient';

import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'react-native-heroicons/outline';
import ParkingArea from '../components/ParkingArea';
const Details = () => {
  const handlePaymentSuccess = () => {
    // Handle successful payment (e.g., navigate to a success screen)
    console.log('Payment successful!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stripe Payment Example</Text>
      <PaymentForm onPaymentSuccess={handlePaymentSuccess} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
export default Details;
