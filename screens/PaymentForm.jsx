/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import React from 'react';
import {View, Button} from 'react-native';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import axios from 'axios';
import {BACKEND_API} from '@env';
const PaymentForm = ({onPaymentSuccess}) => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const fetchPaymentIntentClientSecret = async ({amount = 100}) => {
    try {
      const response = await axios.post(
        `http://192.168.246.138:8080/api/v1/payments/create-payment-intent`,
        {
          amount: (amount * 100).toString(),
          currency: 'USD',
        },
      );

      const data = response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      throw error; // You can handle the error as needed in your component
    }
  };
  const onCheckOut = async () => {
    const intent = await fetchPaymentIntentClientSecret(250);
    if (intent.error) {
      Alert.alert('Something went wrong');
      return;
    }
    const initResponse = await initPaymentSheet({
      merchantDisplayName: 'Parking.dev',
      paymentIntentClientSecret: intent,
    });
    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert('Something went wrong');
      return;
    }
    const paymentResponse = await presentPaymentSheet();

    if (paymentResponse.error) {
      Alert.alert(
        `Error code: ${paymentResponse.error.code}`,
        paymentResponse.error.message,
      );
      return;
    }
  };

  return (
    <View>
      <Button title="Pay" onPress={onCheckOut} />
    </View>
  );
};

export default PaymentForm;
