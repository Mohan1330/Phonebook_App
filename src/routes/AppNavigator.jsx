import { StyleSheet, } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AddNewContactScreen, HomeScreen, ViewContactScreen, ImportContactScreen, CallDetectionScreen } from '../screens';
import { colors } from '../theme';
import CallDetector from '../screens/CallDetector';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary, },
        headerTitleStyle: { fontFamily: 'Poppins-Light', },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        options={{ headerShown: true, headerTintColor: '#fff', }}
        name="Contact App"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{ headerShown: true, headerTintColor: '#fff', }}
        name="Add New Contact"
        component={AddNewContactScreen}
      />
      <Stack.Screen
        options={{ headerShown: true, headerTintColor: '#fff', }}
        name="View Contact"
        component={ViewContactScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true, headerTintColor: '#fff'
        }}
        name="Import Contact"
        component={ImportContactScreen}

      />
      <Stack.Screen
        options={{
          headerShown: true, headerTintColor: '#fff'
        }}
        name="ContactDetect"
        component={CallDetector}

      />
      {/* <Stack.Screen
        options={{
          headerShown: true, headerTintColor: '#fff'
        }}
        name="YourMainComponent"
        component={YourMainComponent}

      /> */}



    </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
