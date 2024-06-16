#!/bin/sh
if [ -d "src" ]
then
    cd src
else
    mkdir src
    cd src
fi


echo "
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface Props {
  props: any
}

const App: React.FC<Props> = () => {
  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})
">App.tsx


# Create subdirectories within "src"
mkdir -p config assets components services hooks i18n models redux routes schema screens theme utils

# Create subdirectories within "assets"
mkdir -p assets/images assets/sounds assets/animations assets/icons assets/fonts

# Create index.ts files in subdirectories within "src"
touch config/index.ts components/index.ts services/index.ts hooks/index.ts i18n/index.ts models/index.ts redux/index.ts routes/index.ts schema/index.ts screens/index.ts theme/index.ts utils/index.ts

# Create placeholder files or directories in subdirectories within "assets"
touch assets/images/index.ts assets/sounds/index.ts assets/animations/index.ts assets/icons/index.ts assets/fonts/index.ts