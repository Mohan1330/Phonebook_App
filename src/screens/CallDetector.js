// import {
//   PermissionsAndroid,
//   StyleSheet,
//   Text,
//   TouchableHighlight,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import CallDetectorManager from 'react-native-call-detection';

// const CallDetectionScreen = () => {
//   const [featureOn, setfeatureOn] = useState(false);
//   const [inComing, setInComing] = useState(false);
//   const [number, setNumber] = useState(null);

//   //   useEffect(() => {
//   //     askPermission();
//   //   },[]);

//   //   const askPermission = async () => {
//   //     try {
//   //         const permissions = await PermissionsAndroid.requestMultiple([
//   //             PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
//   //             PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
//   //         ])
//   //         console.log("permissions are:", permissions);
//   //     } catch (err) {
//   //         console.warn(err);

//   //     };

//   //   };

//   const startListenerTapped = () => {
//     setfeatureOn(true);
//     callDetector = new CallDetectorManager(
//       (event, number) => {
//         console.log(event, number);
//         if (event === 'Disconnected') {
//           setInComing(false);
//           setNumber(null);
//         } else if (event === 'Incoming') {
//           setInComing(true);
//           setNumber(number);
//         } else if (event === 'offhook') {
//           setInComing(false);
//           setNumber(null);
//         } else if (event === 'Missed') {
//           setInComing(false);
//           setNumber(null);
//         }
//       },
//       true,
//       () => {},
//       {
//         title: 'Phone State Permission',
//         message:
//           'This app needs access to your phone state in order to react and/or to adapt to incoming calls.',
//       },
//     );
//   };

//   const stopListenerTapped = () => {
//     callDetector && callDetector.dispose();
//     setfeatureOn(false);
//     setInComing(false);
//   };

//   //   useEffect(() => {
//   //     const callDetector = new CallDetectorManager(
//   //       (event, phoneNumber) => {
//   //         console.log(`Event: ${event}, Phone number: ${phoneNumber}`);
//   //         if(event === "Disconnected")
//   //         setInComing(false);
//   //         SetNumnber(null);
//   //       },
//   //       () => {
//   //         console.log('Permission denied');
//   //       },
//   //       {
//   //         title: 'Phone State Permission',
//   //         message:
//   //           'This app needs access to your phone state in order to detect calls.',
//   //       },
//   //     );

//   //     return () => {
//   //       callDetector && callDetector.dispose();
//   //     };
//   //   }, []);
//   return (
//     <View style={styles.container}>
//       <Text>CallDetectionScreen</Text>
//       <TouchableHighlight
//         onPress={
//           featureOn ? stopListenerTapped : startListenerTapped
//         }></TouchableHighlight>
//       {inComing && (
//         <Text style={{color: 'red', fontSize: 30}}>incoming call {number}</Text>
//       )}
//     </View>
//   );
// };

// export default CallDetectionScreen;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flex: 1,
//   },
// });

// Import necessary components from react-native
// CallDetector.js
import React, {useState, useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import CallDetectorManager from 'react-native-call-detection';
import {PermissionsAndroid} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message'

const CallDetector = props => {
  const [incomingPhoneNumber, setIncomingPhoneNumber] = useState(null);
  const navigation = useNavigation();
  const handleIncomingCall = phoneNumber => {
    setIncomingPhoneNumber(phoneNumber);
  };

  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE);

    const callDetector = new CallDetectorManager(
      (event, phoneNumber) => {
        console.log(event);
        console.log(phoneNumber);
        if (event == 'Incoming') {
          const formatedNumber = phoneNumber.split('+91')[1];
          handleIncomingCall(formatedNumber);
          handleCompareNumber(formatedNumber);
        }
      },
      true, // Enable call detection
      () => {},
    );
    return () => {
      callDetector && callDetector.dispose();
    };
  }, []);

  async function handleCompareNumber(phoneNumber) {
    try {
      const response = await axios.get(
        `http://192.168.0.166:3000/contacts?Phone=${phoneNumber}`,
      );
      const filteredData = [...response.data];
      if (filteredData.length > 0) {
        Alert.alert('Call From Customer', `${filteredData[0].FirstName}`);
      } else {
        Alert.alert('Call Number', `New mobile number found ${phoneNumber}`, [
          {
            text: 'Close',
          },
          {
            text: 'Add',
            onPress: () => {
              navigation.navigate('Add New Contact', {
                mobileNo: phoneNumber,
              });
            },
          },
        ]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      // setLoading(false);
    }
  }

  return (
    <View>
      {incomingPhoneNumber && (
        <View>
          <Text style={{color: 'red', fontSize: 30}}>Incoming call from:</Text>
          <Text style={{color: 'red', fontSize: 30}}>
            {incomingPhoneNumber}
          </Text>
        </View>
      )}
    </View>
  );
};

export default CallDetector;
