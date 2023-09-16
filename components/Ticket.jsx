/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import QRCode from 'react-native-qrcode-svg';
import {width, height, totalSize} from 'react-native-dimension';
import {format} from 'date-fns';
const Ticket = ({reservation, user}) => {
  const dateFormat = 'EEE d MMM yyyy HH:mm';
  const [fin, setFin] = useState(new Date());

  useEffect(() => {
    console.log(reservation.endTime);
    const date = new Date(reservation.endTime);
    console.log(date.getDate() + 1);
    date.setDate(date.getDate() + 1);
    console.log(date);
    setFin(date);
    console.log(fin);
  }, []);

  return (
    <View
      style={{
        alignSelf: 'center',
        height: height(27),
        width: width(80),
        borderRadius: width(4),
        backgroundColor: 'white',
        marginTop: 30,
      }}>
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: 'black',
              padding: 10,
            }}>
            #{reservation.id}
          </Text>
        </View>
        <View
          style={{
            alignSelf: 'flex-end',
            marginTop: height(7),
            padding: 10,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: 'black',
              textAlign: 'right',
            }}>
            {user.name}
          </Text>
          {!moment(reservation.endTime).isAfter(moment()) ? (
            <>
              <Text
                style={{textAlign: 'right', color: 'black', marginRight: 5}}>
                Expired In
              </Text>
            </>
          ) : (
            <>
              <Text
                style={{textAlign: 'right', color: 'black', marginRight: 5}}>
                Valid Till
              </Text>
            </>
          )}

          <Text style={{textAlign: 'right', color: 'black', marginRight: 5}}>
            {moment(fin).format('MMMM D, YYYY h:mm A')}
          </Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            height: height(4),
            width: width(8),
            borderRadius: width(10),
            backgroundColor: '#f7f7f7',
          }}
        />
        <Text style={{color: 'gray'}}>
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          - - -
        </Text>
        <View
          style={{
            height: height(4),
            width: width(8),
            borderRadius: width(10),
            backgroundColor: '#f7f7f7',
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: -10,
        }}>
        <View className="bg-cyan-400 ml-3">
          <QRCode
            value={'not'}
            size={30} // Adjust the size as needed
            color="black" // QR code color
            backgroundColor="white" // Background color
          />
        </View>
        <View style={{alignSelf: 'flex-end'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              textAlign: 'right',
              color: 'black',
              // paddingTop: -10,
              marginRight: 15,
            }}>
            {reservation.price}$
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Ticket;
