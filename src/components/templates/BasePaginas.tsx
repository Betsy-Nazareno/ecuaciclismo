import React, { ReactNode } from 'react'
import tw from 'twrnc'
import { ScrollView, View } from 'react-native'
import NavigationBar from '../moleculas/NavigationBar'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import { BACKGROUND_COLORS } from '../../../utils/constants'

interface Props {
  children: ReactNode | ReactNode[]
  navigation: NativeStackNavigationProp<RootStackParamList, Screens>
}

const BasePaginas = ({ children, navigation }: Props) => {
  return (
    <View style={tw`relative h-full ${BACKGROUND_COLORS.BLUE_LIGHTER}`}>
      <ScrollView style={tw`px-2 mt-[7%] mb-[80px]`}>{children}</ScrollView>
      <NavigationBar navigation={navigation} />
    </View>
  )
}

export default BasePaginas
