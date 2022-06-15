import React, { ReactNode } from 'react'
import tw from 'twrnc'
import { View } from 'react-native'
import NavigationBar from '../moleculas/NavigationBar'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList, Screens } from '../../../models/ScreensTypes'

interface Props {
  children: ReactNode | ReactNode[]
  navigation: NativeStackNavigationProp<RootStackParamList, Screens>
}

const BasePaginas = ({ children, navigation }: Props) => {
  return (
    <View style={tw`relative h-full`}>
      <View style={tw`px-4 mt-2`}>{children}</View>
      <NavigationBar navigation={navigation} />
    </View>
  )
}

export default BasePaginas
