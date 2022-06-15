import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { Text } from 'react-native'
import { RootStackParamList } from '../../models/ScreensTypes'
import BasePaginas from '../components/templates/BasePaginas'

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Perfil'>
}

const Perfil = ({ navigation }: Props) => {
  return (
    <BasePaginas navigation={navigation}>
      <Text>Perfil</Text>
    </BasePaginas>
  )
}

export default Perfil
