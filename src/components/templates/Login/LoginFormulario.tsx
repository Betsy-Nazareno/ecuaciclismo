import * as React from 'react'
import { Text, View, Image, TouchableHighlight } from 'react-native'
import Input from '../../moleculas/Input'
import ButtonPrimary from '../../atomos/ButtonPrimary'
import Ruler from '../../atomos/Ruler'
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
import ErrorMessage from '../../atomos/ErrorMessage'
import { Login } from '../../../models/User'
import Spinner from '../../atomos/Spinner'
import { usePermissionsNotifications } from '../../../hooks/usePermissionsNotifications'
interface Prop {
  navigation: NativeStackNavigationProp<RootStackParamList>
}

const LoginFormulario = ({ navigation }: Prop) => {
  const { initUser } = useAuthentication()
  const [isLoading, setIsLoading] = React.useState(false)
  const [failedLogin, setFailedLogin] = React.useState(false)
  const { registerForPushNotificationsAsync } = usePermissionsNotifications()

  const login = async (props: Login) => {
    try {
      setIsLoading(true)
      const token_notificacion =
        (await registerForPushNotificationsAsync()) || ''
      await initUser({ ...props, token_notificacion })
    } catch (e) {
      setFailedLogin(true)
      setIsLoading(false)
    }
  }

  return (
    <>
      <View
        style={tw`w-full flex flex-row justify-center mt-[${HEIGHT_DIMENSIONS * 0.08
          }]`}
      >
        <Image source={require('../../../../assets/ecuaciclismo_logo.png')} />
      </View>
      <View style={tw`mt-[5px]`}>
        <Formik
          initialValues={{ email: '', password: '', token_notificacion: '' }}
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
                secureTextEntry={true}
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
      <TouchableHighlight
        onPress={() => navigation.navigate('RecuperarContrasena')}
        underlayColor="#E7F5FF"
      >
        <Text style={tw`text-[#F16F31] text-center mt-[5%]`}>¿Olvidaste tu contraseña?</Text>
      </TouchableHighlight>


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
