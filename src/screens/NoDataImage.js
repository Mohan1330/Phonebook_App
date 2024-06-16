import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {colors} from '../theme';

const NoDataImage = ({handlePickFile}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', gap: 15}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ImageBackground
          style={{width: 400, height: 400}}
          resizeMode="contain"
          source={require('../assets/images/noData.png')}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          gap: -20,
          marginTop: -50,
        }}>
        <IconButton
          icon="upload"
          size={40}
          iconColor={colors.primary}
          onPress={handlePickFile}
        />
        <Text style={{color: colors.primary}}>Upload</Text>
      </View>
      <Text style={styles.taskText}>No Data Here... Please Upload File..</Text>
    </View>
  );
};

export default NoDataImage;

const styles = StyleSheet.create({
  taskText: {
    fontSize: 17,
    fontFamily: 'Poppins-Light',
    color: '#000',
  },
});
