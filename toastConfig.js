import { View, Text, Image } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
// import warning from './assets/icons/warning.png';
import error from './src/assets/icons/error.png';
import success from './src/assets/icons/success.png';
import warning from './src/assets/icons/warning.png';

function Toast({ message, image }) {
  return (
    <View style={styles.toastContainer}>
      <Image style={styles.image} source={image} />
      <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
        <Text numberOfLines={5} ellipsizeMode='tail' style={styles.label}>{message}</Text>
      </View>
    </View>
  )
}


export const toastConfig = {
  info: ({ text1, props }) => (
    <Toast image={warning} message={text1} />
  ),
  success: ({ text1, props }) => (
    <Toast image={success} message={text1} />
  ),
  error: ({ text1, props }) => (
    <Toast image={error} message={text1} />
  ),
};

const styles = ScaledSheet.create({
  label: {
    // flex:1,
    fontFamily: 'Poppins-Light',
    marginLeft: '10@s',
    color: '#000',
    fontSize: 15,
  },
  toastContainer: {
    // height: '50@s',
    width: '80%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    padding: '10@s',
    elevation: 7,
    borderRadius: '10@s',
    alignItems: 'center',
  },
  image: {
    width: '30@s',
    height: '30@s'
  }
});
