import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native'
import { colors } from './theme'
import { AppNavigator } from './routes'
import Toast from 'react-native-toast-message';
import { toastConfig } from '../toastConfig';

function App() {
  const fontConfig = {
    default: {
      regular: {
        fontFamily: 'Poppins-Regular',
      },
      medium: {
        fontFamily: 'Poppins-Medium',
      },
      light: {
        fontFamily: 'Poppins-Light',
      },
      thin: {
        fontFamily: 'Poppins-Thin',
      },
    },
  };

  const theme = {
    ...DefaultTheme,
    fonts: configureFonts(fontConfig),
  };
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar backgroundColor={colors.primary} />
        <AppNavigator />
        <Toast config={toastConfig} />

      </NavigationContainer>
    </PaperProvider>
  )
}

export default App