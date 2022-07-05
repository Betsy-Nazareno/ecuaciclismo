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
import {
  BACKGROUND_COLORS,
  HEIGHT_DIMENSIONS,
  WIDTH_DIMENSIONS,
} from '../../../utils/constants'
import ErrorMessage from '../atomos/ErrorMessage'
import { Login } from '../../../models/User'
import Spinner from '../atomos/Spinner'
interface Prop {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>
}

const LoginFormulario = ({ navigation }: Prop) => {
  const { initUser } = useAuthentication()
  const [isLoading, setIsLoading] = React.useState(false)
  const [failedLogin, setFailedLogin] = React.useState(false)

  const login = async (props: Login) => {
    try {
      setIsLoading(true)
      await initUser(props)
    } catch (e) {
      setFailedLogin(true)
      setIsLoading(false)
    }
  }

  return (
    <>
      <View
        style={tw`w-full flex flex-row justify-center mt-[${
          HEIGHT_DIMENSIONS * 0.08
        }]`}
      >
        <Image source={require('../../../assets/ecuaciclismo_logo.png')} />
      </View>
      <View style={tw`mt-[5px]`}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={login}
        >
          {({ handleSubmit, setFieldValue, values }) => (
            <>
              <Input
                type="username"
                placeholder="Correo electrónico"
                stylesProp="w-11/12 mx-auto py-[5%]"
                name="email"
                value={values.email}
                setValue={(value) => setFieldValue('email', value)}
              />
              <Input
                type="password"
                placeholder="Contraseña"
                stylesProp="w-11/12 mx-auto pt-3 pb-[6%]"
                name="password"
                value={values.password}
                setValue={(value) => setFieldValue('password', value)}
              />
              {failedLogin && (
                <ErrorMessage message="Usuario o contraseña incorrectos" />
              )}

              <View style={tw`w-9/12 mx-auto mt-[${HEIGHT_DIMENSIONS * 0.04}]`}>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <ButtonPrimary
                    style={BACKGROUND_COLORS.SKY_BLUE}
                    label="Iniciar sesión"
                    handleClick={handleSubmit}
                  />
                )}
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

      <Ruler style={`w-3/12 mx-auto my-[${WIDTH_DIMENSIONS * 0.1}]`} />

      <View style={tw``}>
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

export default LoginFormulario
