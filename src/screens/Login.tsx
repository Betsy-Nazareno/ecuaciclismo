import React from 'react'
import BaseAutenticacion from '../components/templates/BaseAutenticacion'
import { RootStackParamList } from '../../models/Screens.types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import LoginFormulario from '../components/organismos/LoginFormulario'

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>
}

const Login = ({ navigation }: Props) => {
  return (
    <BaseAutenticacion>
      <LoginFormulario navigation={navigation} />
    </BaseAutenticacion>
  )
}

export default Login
