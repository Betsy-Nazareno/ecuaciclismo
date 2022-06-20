import React from 'react'
import BaseAutenticacion from '../components/templates/BaseAutenticacion'
import LoginContenido from '../components/organismos/LoginContenido'
import { RootStackParamList } from '../../models/Screens.types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>
}

const Login = ({ navigation }: Props) => {
  return (
    <BaseAutenticacion>
      <LoginContenido navigation={navigation} />
    </BaseAutenticacion>
  )
}

export default Login
