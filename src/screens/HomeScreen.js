import {useIsFocused, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Avatar, FAB, Icon, List} from 'react-native-paper';
import {SwipeListView} from 'react-native-swipe-list-view';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {colors} from '../theme';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../toastConfig';
import {success} from '../assets/images';

const HomeScreen = ({}) => {
  // use for Navigation:
  const navigation = useNavigation();
  const [open, setOpen] = React.useState(false);

  const onStateChange = ({open}) => setOpen(open);

  // Show Api:

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const [setselectedContact, setSetselectedContact] = useState(null);
  // Loading indicator:

  // const showToast = () => {
  //   ToastAndroid.show('Contact Deleted Successfully !', ToastAndroid.SHORT);
  // };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://192.168.0.166:3000/contacts');
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (response.status === 200) {
        const updatedData = [...response.data].map((contact, index) => {
          return {
            ...contact,
            value: contact?.FirstName + contact?.LastName,
          };
        });
        // setLoading(false);

        setData(updatedData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Toast.show({
    //   type: 'success',
    //   text1: 'Contact Deleted Sucessfully',
    //   position:'top',
    //   topOffset:40,
    //   bottomOffset:40,

    // });
    fetchData();
  }, [isFocused]);

  const deleteContacts = data => {
    if (data) {
      try {
        fetch('http://192.168.0.166:3000/contacts/' + data?.id, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then(response => response.json())
          .then(json => {
            Toast.show({
              type: 'success',
              text1: 'Contact Deleted Sucessfully',
              position: 'top',
              topOffset: 40,
              bottomOffset: 40,
            });
            // showToast();
            // ToastAndroid.show(
            //   'Contact Deleted SuccessFully',
            //   ToastAndroid.SHORT,
            // );
            // Toast.show({
            //   type: 'success',
            //   text1: 'Contact Deleted Sucessfully',
            //   position:'top',
            //   topOffset:40,
            //   bottomOffset:40,

            // });
          });
      } catch (e) {
        console.log(e);
      } finally {
        fetchData();
      }
    }
  };

  function getData({label, iconName, route}) {
    return {
      icon: ({color, size}) => (
        <FontAwesome6 size={size} color={color} name={iconName} />
      ),
      label: label,
      size: 30,
      color: '#FFF',
      style: {marginRight: 10, backgroundColor: colors.primary},
      labelStyle: {fontFamily: 'Poppins-Medium'},
      onPress: () => navigation.navigate(route),
      labelTextColor: '#FFFF',
    };
  }

  return (
    <View style={styles.container}>
      {/* <Pressable
        style={styles.fab}
        onPress={() => navigation.navigate('Add New Contact')}>
        <Icon source="plus" size={30} color="#fff" />
      </Pressable> */}

      <FAB.Group
        open={open}
        visible={true}
        icon={open ? 'close' : 'plus'}
        style={{zIndex: 9999}}
        fabStyle={{
          backgroundColor: colors.primary,
          width: 80,
          height: 80,
          borderRadius: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        color="#FFF"
        small={false}
        backdropColor="rgba(0,0,0,.5)"
        actions={[
          getData({
            iconName: 'address-book',
            route: 'Add New Contact',
            label: 'Add New',
          }),
          getData({
            iconName: 'file-csv',
            route: 'Import Contact',
            label: 'Import',
          }),
          getData({
            iconName: 'users',
            route: 'ContactDetect',
            label: 'Detect Contacts',
          }),
        ]}
        onStateChange={onStateChange}
        onPress={() => {}}
      />

      {loading ? (
        <Spinner
          visible={loading}
          customIndicator={
            <View>
              <ActivityIndicator
                size={'large'}
                color={colors.primary}></ActivityIndicator>
              <Text style={styles.spinnerTextStyle}>Loading...</Text>
            </View>
          }
        />
      ) : (
        // <AlphabetList
        //   data={data}
        //   style={{
        //     flex: 1,
        //     width: '100%',
        //     paddingHorizontal: 5,
        //     paddingVertical: 5,
        //   }}
        //   contentContainerStyle={{gap: 15}}
        //   keyExtractor={item => item.id.toString()}
        //   indexLetterStyle={{
        //     color: 'green',
        //     fontSize: 20,
        //     lineHeight: 20,
        //   }}
        //   indexContainerStyle={{
        //     backgroundColor: 'rgba(0,0,0,.2)',
        //     width: 20,
        //   }}
        //   indexLetterContainerStyle={{
        //     width: '100%',
        //   }}
        //   renderCustomItem={item => (
        //     <List.Item
        //       left={() => (
        //         <Avatar.Text
        //           style={{backgroundColor: colors.primary}}
        //           label={item?.FirstName?.charAt(0)}
        //         />
        //       )}
        //       style={{backgroundColor: '#FFF', paddingHorizontal: 15}}
        //       title={item.FirstName}
        //       description={item.Phone}
        //       titleStyle={{fontSize: 20, color: '#000', fontWeight: 'bold'}}
        //       descriptionStyle={{
        //         fontSize: 18,
        //         color: 'grey',
        //         alignItems: 'center',
        //       }}
        //     />
        //   )}
        //   renderCustomSectionHeader={section => <View style={{height: 1}} />}
        // />
        <>
          <SwipeListView
            data={data}
            style={{
              flex: 1,
              width: '100%',
              paddingHorizontal: 5,
              paddingVertical: 5,
            }}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={() => fetchData()}
              />
            }
            disableRightSwipe={true}
            contentContainerStyle={{gap: 15}}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    navigation.navigate('View Contact', item);
                  }}>
                  <List.Item
                    left={() => (
                      <Avatar.Text
                        style={{
                          backgroundColor: colors.primary,
                          fontFamily: 'Poppins-Light',
                        }}
                        label={String(item?.FirstName)?.charAt(0)}
                      />
                    )}
                    style={{
                      backgroundColor: '#FFF',
                      paddingHorizontal: 15,
                      fontFamily: 'Poppins-Light',
                    }}
                    title={item.FirstName}
                    description={item.Phone}
                    titleStyle={{
                      fontSize: 20,
                      color: '#000',
                      fontFamily: 'Poppins-Light',
                    }}
                    descriptionStyle={{
                      fontSize: 18,
                      color: 'grey',
                      alignItems: 'center',
                      fontFamily: 'Poppins-Light',
                    }}
                  />
                </TouchableOpacity>
              );
            }}
            renderHiddenItem={(data, rowMap) => (
              <View style={styles.rowBack}>
                <Text>Left</Text>
                <Pressable
                  onPress={async () => {
                    Alert.alert('Delete!', 'Are you Sure Want to Delete', [
                      {
                        text: 'Yes',
                        onPress: () => {
                          deleteContacts(data?.item);

                          // alert(JSON.stringify(data.item));
                        },
                      },
                      {
                        text: 'No',
                      },
                    ]);
                  }}>
                  <Icon source="trash-can" size={40} color={'tomato'} />
                </Pressable>
              </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
          />
        </>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  fab: {
    position: 'absolute',
    // margin: 16,
    right: 20,
    bottom: 20,
    zIndex: 9999,
    height: 80,
    width: 80,
    borderRadius: 40,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  listContainer: {
    // flex: 1,
    width: '100%',
    gap: 5,
    // marginTop:10,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
    // marginBottom: 15,
  },
  sectionHeaderContainer: {
    height: 50,
    backgroundColor: '#dcdcdc',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  sectionHeaderLabel: {
    color: 'grey',
  },
  rowBack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor:"red",
    flex: 1,
    paddingHorizontal: 20,
  },
  spinnerTextStyle: {
    color: colors.primary,
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
});
