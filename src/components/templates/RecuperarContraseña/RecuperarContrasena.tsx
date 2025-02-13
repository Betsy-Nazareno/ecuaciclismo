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
import { recuperarContrasena } from '../../../lib/services/user.services'
import { resetPasswordValidationSchema } from '../../../schemas/ResetPasswordValidationSchema'
import NotificationPopUp from '../../organismos/NotificationPopUp'

const RecuperarContrasenaFormulario = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
  const [isLoading, setIsLoading] = React.useState(false)
  const [displayMenu, setDisplayMenu] = React.useState(false)
  const [img, setImg] = React.useState<string>('caution')
  const [text, setText] = React.useState<string>('Hubo un error, intentelo más tarde por favor.')
  const initialValues = {
    email: '',
  }

  const handleSubmit = async (data: { email: string }) => {
    setIsLoading(true)
    console.log(data.email);
    try {
      const response = await recuperarContrasena(data.email);
      if (response.data.status === 'success') {
        setImg('verificacion_envio')
        
      }else{
        setImg('caution')
      }
      setText(response.data.mensaje)
      setIsLoading(false)
      setDisplayMenu(true)
    } catch (error) {
      setIsLoading(false)
      setDisplayMenu(true)
    }


  }

  return (
    <>
      <NotificationPopUp
        setVisible={setDisplayMenu}
        visible={displayMenu}
        imageName={img}
        body={text}
        setConfirmation={() => navigation.navigate('Login')}
      />
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
          validationSchema={resetPasswordValidationSchema}
          onSubmit={handleSubmit}
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
    </>

  )
}

export default RecuperarContrasenaFormulario
