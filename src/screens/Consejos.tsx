import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { Text } from 'react-native'
import { RootStackParamList } from '../../models/ScreensTypes'
import BasePaginas from '../components/templates/BasePaginas'

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Inicio'>
}

const Consejos = ({ navigation }: Props) => {
  return (
    <BasePaginas navigation={navigation}>
      <Text>Consejos</Text>
    </BasePaginas>
  )
}

export default Consejos
