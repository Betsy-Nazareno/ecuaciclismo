import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import * as React from 'react'
import { Image, Text, View } from 'react-native'
import tw from 'twrnc'
import { createUser } from '../../../lib/services/user.services'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import { Registro } from '../../../models/User'
import { registroValidationSchema } from '../../../schemas/RegistroSchema'
import { BACKGROUND_COLORS, HEIGHT_DIMENSIONS } from '../../../utils/constants'
import ButtonPrimary from '../atomos/ButtonPrimary'
import Input from '../atomos/Input'
import Ruler from '../atomos/Ruler'

const RegistroFormulario = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
  const initialValues = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  }
  const handleSubmit = async (props: Registro) => {
    console.log(props)
    await createUser(props)
    navigation.navigate('Login')
  }
  return (
    <View style={tw`pt-[${HEIGHT_DIMENSIONS * 0.1}]`}>
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
        {({ handleSubmit, values, setFieldValue }) => (
          <>
            <Input
              type="givenName"
              stylesProp="w-full mx-auto pt-[5%] pb-[2%]"
              name="first_name"
              placeholder="Nombre"
              value={values.first_name}
              setValue={(value) => setFieldValue('first_name', value)}
            />
            <Input
              placeholder="Apellido"
              type="familyName"
              stylesProp="w-full mx-auto py-[2%]"
              name="last_name"
              value={values.last_name}
              setValue={(value) => setFieldValue('last_name', value)}
            />

            <Ruler style="w-10/12 mx-auto my-[4%] bg-[#e6e6e9]" />

            <Input
              placeholder="Usuario"
              type="username"
              stylesProp="w-full mx-auto py-[2%]"
              name="username"
              value={values.username}
              setValue={(value) => setFieldValue('username', value)}
            />

            <Input
              placeholder="Correo electrónico"
              type="emailAddress"
              stylesProp="w-full mx-auto py-[2%]"
              name="email"
              value={values.email}
              setValue={(value) => setFieldValue('email', value)}
            />
            <Ruler style="w-10/12 mx-auto my-[4%] bg-[#e6e6e9]" />
            <Input
              placeholder="Contraseña"
              type="password"
              stylesProp="w-full mx-auto py-[2%]"
              name="password"
              value={values.password}
              setValue={(value) => setFieldValue('password', value)}
            />

            <Input
              placeholder="Confirmar Contraseña"
              type="password"
              stylesProp="w-full mx-auto py-[2%]"
              name="password_confirmation"
              value={values.password_confirmation}
              setValue={(value) =>
                setFieldValue('password_confirmation', value)
              }
            />
            <View style={tw`w-9/12 mx-auto my-[7%]`}>
              <ButtonPrimary
                label="¡Unirme!"
                handleClick={handleSubmit}
                style={BACKGROUND_COLORS.SKY_BLUE}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  )
}

export default RegistroFormulario
