import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { RootStackParamList } from '../../models/ScreensTypes'
import RegistroContenido from '../components/organismos/RegistroContenido'
import BaseAutenticacion from '../components/templates/BaseAutenticacion'

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Registro'>
}

const Registro = ({ navigation }: Props) => {
  return (
    <BaseAutenticacion>
      <RegistroContenido navigation={navigation} />
    </BaseAutenticacion>
  )
}

export default Registro
