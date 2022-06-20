import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { Button, Text } from 'react-native'
import { RootStackParamList } from '../../models/Screens.types'
import BasePaginas from '../components/templates/BasePaginas'
import { useAuthentication } from '../../hooks/useAuthentication'

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Perfil'>
}

const Perfil = ({ navigation }: Props) => {
  const { deleteUserStore } = useAuthentication()

  return (
    <BasePaginas navigation={navigation}>
      <Text>Perfil</Text>
      <Button title="Cerrar sesion" onPress={deleteUserStore}></Button>
    </BasePaginas>
  )
}

export default Perfil
