import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import * as React from 'react'
import { Image, Text, View } from 'react-native'
import tw from 'twrnc'
import { RootStackParamList } from '../../../models/Screens.types'
import { registroValidationSchema } from '../../../schemas/RegistroSchema'
import ButtonPrimary from '../atomos/ButtonPrimary'
import Input from '../atomos/Input'
import Ruler from '../atomos/Ruler'

interface Prop {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Registro'>
}

const RegistroContenido = ({ navigation }: Prop) => {
  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }
  const handleSubmit = () => {
    navigation.navigate('Login')
  }
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
      <Formik
        initialValues={initialValues}
        validationSchema={registroValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <>
            <Input
              text="Nombre"
              type="givenName"
              stylesProp="w-11/12 mx-auto pt-[5%] pb-[2%]"
              name="first_name"
            />
            <Input
              text="Apellido"
              type="familyName"
              stylesProp="w-11/12 mx-auto py-[2%]"
              name="last_name"
            />

            <Ruler style="w-10/12 mx-auto mt-[4%] bg-[#e6e6e9]" />

            <Input
              text="Correo electrónico"
              type="emailAddress"
              stylesProp="w-11/12 mx-auto py-[2%]"
              name="email"
            />

            <Input
              text="Contraseña"
              type="password"
              stylesProp="w-11/12 mx-auto py-[2%]"
              name="password"
            />

            <Input
              text="Confirmar Contraseña"
              type="password"
              stylesProp="w-11/12 mx-auto py-[2%]"
              name="password_confirmation"
            />
            <View style={tw`w-9/12 mx-auto my-[7%]`}>
              <ButtonPrimary label="¡Unirme!" handleClick={handleSubmit} />
            </View>
          </>
        )}
      </Formik>
    </>
  )
}

export default RegistroContenido
