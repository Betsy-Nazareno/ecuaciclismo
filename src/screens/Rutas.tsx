import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { Text } from 'react-native'
import { RootStackParamList } from '../../models/Screens.types'
import BasePaginas from '../components/templates/BasePaginas'

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Rutas'>
}

const Rutas = ({ navigation }: Props) => {
  return (
    <BasePaginas navigation={navigation}>
      <Text>Rutas</Text>
    </BasePaginas>
  )
}

export default Rutas
