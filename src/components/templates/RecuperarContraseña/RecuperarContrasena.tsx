import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import * as React from 'react'
import { Image, Text, View } from 'react-native'
import tw from 'twrnc'
//import { usePermissionsNotifications } from '../../../hooks/usePermissionsNotifications'
//import { resetPassword } from '../../../lib/services/user.services' // Asumiendo que existe una función resetPassword
import { RootStackParamList, Screens } from '../../../models/Screens.types'
//import { resetPasswordValidationSchema } from '../../../schemas/ResetPasswordSchema' // Asumiendo que existe un esquema para la validación del restablecimiento de contraseña
import { BACKGROUND_COLORS, HEIGHT_DIMENSIONS } from '../../../utils/constants'
import ButtonPrimary from '../../atomos/ButtonPrimary'
import Input from '../../moleculas/Input'
//import Ruler from '../../atomos/Ruler'
import Spinner from '../../atomos/Spinner'

const RecuperarContrasenaFormulario = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
  const [isLoading] = React.useState(false)
  //const { registerForPushNotificationsAsync } = usePermissionsNotifications()

  const initialValues = {
    email: '',
  }
  /*
  const handleSubmit = async (props: { email: string }) => {
    setIsLoading(true)
    // Lógica para enviar el enlace de restablecimiento de contraseña
    //await resetPassword(props.email)
    // Puedes redirigir a una pantalla de confirmación o mostrar un mensaje aquí
    setIsLoading(false)
  }
  */

  return (
    <View style={tw`pt-[${HEIGHT_DIMENSIONS * 0.1}] mx-2`}>
      <View style={tw`w-full flex flex-row justify-center mx-`}>
        <Image
          source={require('../../../../assets/ecuaciclismo_logo_small.png')}
        />
      </View>
      <Text style={tw`text-[#F16F31] text-2xl text-center font-bold`}>
      Restablecer Contraseña
      </Text>
      
      <Text style={tw`text-gray-600 text-sm text-center m-5`}>
        Ingrese su correo electrónico y le enviaremos un enlace para restablecer su contraseña
      </Text>

      <Formik
        initialValues={initialValues}
      //validationSchema={resetPasswordValidationSchema}
      //onSubmit={handleSubmit}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <>
            
            <Input
              placeholder="Correo electrónico"
              type="emailAddress"
              stylesProp="w-full px-5  mx-auto pt-[5%] pb-[5%]"
              name="email"
              value={values.email}
              setValue={(value) => setFieldValue('email', value)}
            />

            {isLoading ? (
              <Spinner />
            ) : (
              <View style={tw`w-9/12 mx-auto my-[7%]`}>
                <ButtonPrimary
                  label="Restablecer Contraseña"
                  handleClick={handleSubmit}
                  style={BACKGROUND_COLORS.SKY_BLUE}
                />
              </View>
            )}

            <View style={tw`w-9/12 mx-auto my-2`}>
              <ButtonPrimary
                label="Regresar a Inicio de Sesión"
                handleClick={() => navigation.goBack()}
                style={BACKGROUND_COLORS.DARK_GRAY}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  )
}

export default RecuperarContrasenaFormulario
