import * as React from 'react'
import { Text, View, Image, TouchableHighlight } from 'react-native'
import Input from '../atomos/Input'
import ButtonPrimary from '../atomos/ButtonPrimary'
import tw from 'twrnc'
import TouchableMessage from '../atomos/TouchableMessage'
import Ruler from '../atomos/Ruler'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../models/ScreensTypes'
import { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux'

interface Prop {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>
}

const LoginContenido = ({ navigation }: Prop) => {
  const { name, email } = useSelector((state: RootState) => state.user)
  return (
    <>
      <View style={tw`w-full flex flex-row justify-center`}>
        <Text>
          {name} - {email}
        </Text>
        <Image source={require('../../../assets/ecuaciclismo_logo.png')} />
      </View>
      <View style={tw`mt-4`}>
        <Input
          type="username"
          placeholder="Correo electrónico"
          stylesProp="w-11/12 mx-auto py-6"
        />
        <Input
          type="password"
          placeholder="Contraseña"
          stylesProp="w-11/12 mx-auto pt-3 pb-6"
        />
      </View>

      <View style={tw`w-9/12 mx-auto mt-6`}>
        <ButtonPrimary
          label="Iniciar sesión"
          handleClick={() => navigation.navigate('Inicio')}
        />
      </View>

      <TouchableMessage
        text="¿Olvidaste tu contraseña?"
        style="mt-4"
        handleClick={() => {
          return
        }}
      />

      <Ruler style="w-3/12 mx-auto mt-4" />

      <View style={tw`mt-9`}>
        <Text style={tw`text-center `}>
          ¿No tienes una cuenta?{' '}
          <TouchableHighlight
            onPress={() => navigation.navigate('Registro')}
            underlayColor="#E7F5FF"
          >
            <Text style={tw`text-[#F16F31]`}>¡Únete ahora!</Text>
          </TouchableHighlight>
        </Text>
      </View>
    </>
  )
}

export default LoginContenido
