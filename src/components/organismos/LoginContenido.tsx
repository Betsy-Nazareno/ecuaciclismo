import * as React from 'react'
import { Text, View, Image, TouchableHighlight } from 'react-native'
import Input from '../atomos/Input'
import ButtonPrimary from '../atomos/ButtonPrimary'
import TouchableMessage from '../atomos/TouchableMessage'
import Ruler from '../atomos/Ruler'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../models/Screens.types'
import tw from 'twrnc'
import { Formik } from 'formik'
import { loginValidationSchema } from '../../../schemas/LoginSchema'
import { useAuthentication } from '../../../hooks/useAuthentication'

interface Prop {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>
}

const LoginContenido = ({ navigation }: Prop) => {
  // const login = async (props: Login) => {
  //   const data = { user: { username: props.email, password: props.password } }
  //   try {
  //     const response = await axios.post(
  //       'https://ecuaciclismoapp.pythonanywhere.com/api/token-auth/',
  //       data
  //     )
  //     const { first_name, last_name, email, username, token } =
  //       response.data || {}

  //     const user = { first_name, last_name, email, username }

  //     dispatch(
  //       iniciarSesion({
  //         token,
  //         user,
  //       })
  //     )

  //     await SecureStore.setItemAsync('user', JSON.stringify({ token, user }))

  //     // Congrats! You've just stored your first value!
  //   } catch (error) {
  //     console.log('error')
  //   }

  //   // const consejos = await axios({
  //   //   method: 'GET',
  //   //   url: 'https://ecuaciclismoapp.pythonanywhere.com/api/consejodia/get_consejos_dia/',
  //   //   headers: { Authorization: 'Token ' + data2.token },
  //   // })
  //   // console.log('consejos', consejos.data)
  //   // navigation.navigate('Inicio')
  // }

  const { initUser } = useAuthentication()

  return (
    <>
      <View style={tw`w-full flex flex-row justify-center`}>
        <Image source={require('../../../assets/ecuaciclismo_logo.png')} />
      </View>
      <View style={tw`mt-[3%]`}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={initUser}
        >
          {({ handleSubmit }) => (
            <>
              <Input
                type="username"
                placeholder="Correo electrónico"
                stylesProp="w-11/12 mx-auto py-[5%]"
                name="email"
              />
              <Input
                type="password"
                placeholder="Contraseña"
                stylesProp="w-11/12 mx-auto pt-3 pb-[6%]"
                name="password"
              />

              <View style={tw`w-9/12 mx-auto mt-[6%]`}>
                <ButtonPrimary
                  label="Iniciar sesión"
                  handleClick={handleSubmit}
                />
              </View>
            </>
          )}
        </Formik>
      </View>

      <TouchableMessage
        text="¿Olvidaste tu contraseña?"
        style="mt-[5%]"
        handleClick={() => {
          return
        }}
      />

      <Ruler style="w-3/12 mx-auto mt-[5%]" />

      <View style={tw`mt-[10%]`}>
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
