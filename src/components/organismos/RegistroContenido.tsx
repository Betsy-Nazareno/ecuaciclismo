import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import * as React from 'react'
import { Image, Text, View } from 'react-native'
import tw from 'twrnc'
import { RootStackParamList } from '../../../models/ScreensTypes'
import ButtonPrimary from '../atomos/ButtonPrimary'
import Input from '../atomos/Input'
import Ruler from '../atomos/Ruler'

interface Prop {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Registro'>
}

const RegistroContenido = ({ navigation }: Prop) => {
  return (
    <>
      <View style={tw`w-full flex flex-row justify-center`}>
        <Image
          source={require('../../../assets/ecuaciclismo_logo_small.png')}
        />
      </View>
      <Text style={tw`text-[#F16F31] text-2xl text-center font-bold`}>
        ¡Registrate!
      </Text>
      <Input
        text="Nombre"
        type="givenName"
        stylesProp="w-11/12 mx-auto pt-4 pb-2"
      />
      <Input
        text="Apellido"
        type="familyName"
        stylesProp="w-11/12 mx-auto py-2"
      />

      <Ruler style="w-10/12 mx-auto mt-4" />

      <Input
        text="Correo electrónico"
        type="emailAddress"
        stylesProp="w-11/12 mx-auto py-2"
      />

      <Input
        text="Contraseña"
        type="password"
        stylesProp="w-11/12 mx-auto py-2"
      />

      <Input
        text="Confirmar Contraseña"
        type="password"
        stylesProp="w-11/12 mx-auto py-2"
      />

      <View style={tw`w-9/12 mx-auto my-6`}>
        <ButtonPrimary
          label="¡Unirme!"
          handleClick={() => navigation.navigate('Login')}
        />
      </View>
    </>
  )
}

export default RegistroContenido
