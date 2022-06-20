import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { Text } from 'react-native'
import { RootStackParamList } from '../../models/Screens.types'
import BasePaginas from '../components/templates/BasePaginas'

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Publicaciones'>
}

const Publicaciones = ({ navigation }: Props) => {
  return (
    <BasePaginas navigation={navigation}>
      <Text>Publicaciones</Text>
    </BasePaginas>
  )
}

export default Publicaciones
