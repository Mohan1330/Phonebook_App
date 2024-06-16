import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Alert, Linking, StyleSheet, Text, View} from 'react-native';
import {Avatar, Card, Divider, IconButton} from 'react-native-paper';
import AvatarComponent from '../components/AvatarComponent';
import {colors} from '../theme';
import Toast from 'react-native-toast-message';

const ViewContactScreen = props => {
  const navigation = useNavigation();
  const data = props?.route?.params;

  const ContactDetails = [
    {
      title: 'Phone',
      value: data?.Phone,
    },
    {
      title: 'EmailId',
      value: data?.Email,
    },
    {
      title: 'Address',
      value: data?.Address,
    },
  ];

  const deleteContacts = () => {
    if (data) {
      console.log(data);
      try {
        fetch('http://192.168.0.166:3000/contacts/' + data?.id, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then(response => response.json())
          .then(json =>  {
            Toast.show({
              type: 'success',
              text1: 'Contact Deleted Sucessfully',
              position: 'bottom',
              topOffset: 40,
              bottomOffset: 40,
            });
          });
      } catch (e) {
        console.log(e);
      } finally {
        navigation.navigate('Contact App');
      }
    }
  };

  // const callingMethod = () => {
  //   // const args = {
  //   //   number:data.Phone,
  //   //   prompt:false,
  //   // };
  //   // //make a call:
  //   // call(args).catch(console.log.error)
  //   Linking.openURL(`tel:${data.Phone}`);
  // };

  const handleCall = () => Linking.openURL(`tel:${data.Phone}`);
  const handleMessage = () => Linking.openURL(`sms:${data.Phone}?body=`);
  return (
    <View style={styles.container}>
      <View style={styles.upper}>
        <Avatar.Text
          size={160}
          style={{backgroundColor: '#fff', fontFamily: 'Poppins-Light'}}
          label={data?.FirstName?.charAt(0)}
          labelStyle={{color: '#ba2f16'}}
        />
      </View>
      <View style={styles.middle}>
        <Text
          style={{
            color: 'black',
            fontSize: 35,
            marginLeft: 13,
            fontFamily: 'Poppins-Light',
          }}>
          {data.FirstName} {data.LastName}
        </Text>
      </View>
      <View style={styles.end}>
        <View style={styles.endText}>
          {ContactDetails?.map((contacts, index) => {
            // console.log(contacts);
            return (
              <Card
                key={index.toString()}
                style={{height: '30%', backgroundColor: '#fff'}}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    justifyContent: 'center',
                    padding: 15,
                    fontFamily: 'Poppins-Light',
                  }}>
                  {contacts.title}
                </Text>
                <Divider style={{}} />
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    padding: 15,
                    fontFamily: 'Poppins-Light',
                  }}>
                  {contacts.value}
                </Text>
              </Card>
            );
          })}

          {/* <Card.Title
            style={{backgroundColor: '#fff'}}
            titleStyle={{color: 'black', fontSize: 18}}
            subtitleStyle={{color: 'black', fontSize: 18}}
            title="Email"
            subtitle="8754554"
          />
          <Card.Title
            style={{backgroundColor: '#fff'}}
            titleStyle={{color: 'black', fontSize: 18}}
            subtitleStyle={{color: 'black', fontSize: 18}}
            title="Address"
            subtitle="8848848484"
          /> */}
        </View>
      </View>
      <View
        style={{
          flex: 0.1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          borderWidth: 0.2,
          marginTop: 5,
          borderColor: 'red',
          backgroundColor: colors.primary,
        }}>
        <AvatarComponent
          onPress={handleMessage}
          source={require('../assets/images/message.png')}
        />

        {/* <Image
          style={{width: 30, height: 30}}
          source={require('../assets/images/message.png')}
        /> */}
        {/* <IconButton
          icon="message"
          mode="contained"
          backgroundColor="#fff"
          iconColor="#ba2f16"
          onPress={handleMessage}>
          Press me
        </IconButton> */}
        <IconButton
          icon="phone"
          backgroundColor="#fff"
          iconColor="#ba2f16"
          mode="contained"
          onPress={handleCall}></IconButton>
        <IconButton
          icon="pencil"
          mode="contained"
          backgroundColor="#fff"
          iconColor="#ba2f16"
          onPress={() =>
            navigation.navigate('Add New Contact', data)
          }></IconButton>
        <IconButton
          icon="trash-can"
          mode="contained"
          backgroundColor="#fff"
          iconColor="#ba2f16"
          onPress={deleteContacts}>
          Press me
        </IconButton>
      </View>
    </View>
  );
};

export default ViewContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
  },
  upper: {
    flex: 0.3,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    flex: 0.1,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    color: 'black',
  },
  end: {
    flex: 0.5,
    width: '100%',
    marginTop: 2,
    padding: 10,
    // gap: 50,
  },
  endText: {
    gap: 10,
  },
});
