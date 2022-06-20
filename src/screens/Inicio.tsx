import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { RootStackParamList } from '../../models/Screens.types'
import BasePaginas from '../components/templates/BasePaginas'
import Consejos from '../components/templates/Consejos'

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Inicio'>
}

const Inicio = ({ navigation }: Props) => {
  return (
    <BasePaginas navigation={navigation}>
      <Consejos />
    </BasePaginas>
  )
}

export default Inicio
