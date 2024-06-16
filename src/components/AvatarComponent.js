import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../theme';

const AvatarComponent = ({
  style,
  size = 40,
  source,
  backgroundColor = '#FFFF',
  imageStyle,
  tintColor = colors.primary,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        {
          width: size,
          height: size,
          padding: 0,
          borderRadius: size / 2,
          backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
          overFlow: 'hidden',
        },
        style,
      ]}>
      <Image
        source={source}
        tintColor={tintColor}
        style={[
          {
            width: size - 10,
            height: size - 10,
            borderRadius: size - 10 / 2,
            resizeMode: 'contain',
          },
          imageStyle,
        ]}
      />
    </TouchableOpacity>
  );
};

export default AvatarComponent;
