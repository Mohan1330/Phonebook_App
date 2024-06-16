import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import * as Yup from 'yup';
import {colors} from '../theme';
import Toast from 'react-native-toast-message';

const AddContactValidationSchema = Yup.object().shape({
  firstname: Yup.string().required('First Name is required'),
  lastname: Yup.string().required('Last Name is required'),
  number: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid phone number')
    .required('Phone number is required'),
});

const AddNewContactScreen = props => {
  const navigation = useNavigation();
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setValues,
  } = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      number: '',
      email: '',
      address: '',
    },
    validateOnMount: true,
    onSubmit: values => Savecontact(values),
    validationSchema: AddContactValidationSchema,
  });

  const data = props?.route?.params ?? {};
  const mobileNo = props?.route?.params?.mobileNo ?? {};

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      console.log(data);
      navigation?.setOptions({
        headerTitle: 'Update Contact',
      });
      setValues({
        id: data?.id,
        firstname: data?.FirstName,
        lastname: data?.LastName,
        number: data?.Phone,
        email: data?.Email,
        address: data?.Address,
      });
    }
    if (mobileNo?.length > 0) {
      setValues({
        ...values,
        number: mobileNo,
      });
    }
  }, []);

  const Savecontact = data => {
    if (data.id) {
      try {
        fetch('http://192.168.0.166:3000/contacts/' + data.id, {
          method: 'PUT',
          body: JSON.stringify({
            FirstName: data?.firstname,
            LastName: data?.lastname,
            Phone: data?.number,
            Email: data?.email,
            Address: data?.address,
            id: data.id,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then(response => response.json())
          .then(json =>  {
            Toast.show({
              type: 'success',
              text1: 'Contact Updated Sucessfully',
              position: 'top',
              topOffset: 40,
              bottomOffset: 40,
            });
          });
      } catch (e) {
        console.log(e);
      } finally {
        navigation.navigate('Contact App');
      }
    } else {
      try {
        // alert(JSON.stringify(data, null, 4));
        fetch('http://192.168.0.166:3000/contacts', {
          method: 'POST',
          body: JSON.stringify({
            FirstName: data?.firstname,
            LastName: data?.lastname,
            Phone: data?.number,
            Email: data?.email,
            Address: data?.address,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then(response => response.json())
          .then(json => {
            Toast.show({
              type: 'success',
              text1: 'Contact Added Sucessfully',
              position: 'top',
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
  // const deleteContacts = () => {
  //   if (data) {
  //     try {
  //       fetch('http://192.168.0.166:3000/contacts/' + data?.id, {
  //         method: 'DELETE',
  //         headers: {
  //           'Content-type': 'application/json; charset=UTF-8',
  //         },
  //       })
  //         .then(response => response.json())
  //         .then(json => console.log(json));
  //     } catch (e) {
  //       console.log(e);
  //     } finally {
  //       navigation.navigate('Contact App');
  //     }
  //   }
  // };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input]}
        contentStyle={styles.contentStyle}
        placeholder="First Name"
        value={values?.firstname}
        // textColor={'black'}
        onChangeText={handleChange('firstname')}
        onBlur={handleBlur('firstname')}
        placeholderTextColor={'grey'}
        keyboardType="default"
        outlineColor="#fff"
        activeOutlineColor="#fff"
        activeUnderlineColor="#73777B"
        mode="flat"
        cursorColor="#ba2f16"
      />
      {touched.firstname && errors.firstname && (
        <Text style={styles.validate}>{errors.firstname}</Text>
      )}
      <TextInput
        style={[styles.input]}
        contentStyle={styles.contentStyle}
        placeholder="Last Name"
        value={values?.lastname}
        textColor={'black'}
        onChangeText={handleChange('lastname')}
        onBlur={handleBlur('lastname')}
        placeholderTextColor={'grey'}
        keyboardType="default"
        outlineColor="#fff"
        activeUnderlineColor="#73777B"
        activeOutlineColor="#fff"
        mode="flat"
        cursorColor="#ba2f16"
      />
      {touched.lastname && errors.lastname && (
        <Text style={styles.validate}>{errors.lastname}</Text>
      )}
      <TextInput
        style={[styles.input]}
        contentStyle={styles.contentStyle}
        placeholder="Phone"
        value={values?.number}
        textColor={'black'}
        onChangeText={handleChange('number')}
        onBlur={handleBlur('number')}
        placeholderTextColor={'grey'}
        keyboardType="number-pad"
        outlineColor="#fff"
        activeUnderlineColor="#73777B"
        activeOutlineColor="#fff"
        mode="flat"
        cursorColor="#ba2f16"
      />
      {touched.number && errors.number && (
        <Text style={styles.validate}>{errors.number}</Text>
      )}
      <TextInput
        style={[styles.input]}
        contentStyle={styles.contentStyle}
        placeholder="Email"
        value={values?.email}
        textColor={'black'}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        placeholderTextColor={'grey'}
        activeUnderlineColor="#73777B"
        keyboardType="email-address"
        outlineColor="#fff"
        activeOutlineColor="#fff"
        mode="flat"
        cursorColor="#ba2f16"
      />
      <TextInput
        style={[styles.input]}
        contentStyle={styles.contentStyle}
        placeholder="Address"
        value={values?.address}
        textColor={'black'}
        onChangeText={handleChange('address')}
        onBlur={handleBlur('address')}
        placeholderTextColor={'grey'}
        keyboardType="default"
        outlineColor="#fff"
        activeUnderlineColor="#73777B"
        activeOutlineColor="#fff"
        mode="flat"
        cursorColor="#ba2f16"
      />

      <View style={styles.buttonview}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttontext}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Import Contact')}>
          <Text style={styles.buttontext}>Import Contacts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddNewContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 25,
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    marginLeft: 5,
    justifyContent: 'center',
    outline: 'none',
    backgroundColor: '#fff',
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
  },
  contentStyle: {
    fontFamily: 'Poppins-Regular',
  },
  buttonview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 10,
    backgroundColor: colors.primary,
    padding: 10,
    marginTop: 30,
    // fontFamily: 'Poppins-Light',
  },
  buttontext: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Poppins-Light',
    // justifyContent:'center',
    // alignItems:'center',
  },
  validate: {
    color: 'red',
    fontSize: 10,
    fontFamily: 'Poppins-Light',
    marginTop: -18,
    marginLeft: 10,
  },
});
