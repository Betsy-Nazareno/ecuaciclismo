import { NavigationProp, useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'twrnc'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import { RootState } from '../../../redux/store'
import HeaderScreen from '../../moleculas/HeaderScreen'
import NotificationPopUp from '../../organismos/NotificationPopUp'
import SecondaryButton from '../../atomos/SecondaryButton'
import GalleryMultiImages from '../../organismos/GalleryMultiImages'
import { BACKGROUND_COLORS, FOLDERS_STORAGE, TEXT_COLORS } from '../../../utils/constants'
import { Text, View, Pressable, Image } from 'react-native'
import Input from '../../moleculas/Input'
import { isDocumentResultType } from '../../../utils/ckeckTypes'
import { guardarArchivo } from '../../../lib/googleCloudStorage'
import { Formik } from 'formik'
import FieldFormulario from '../../moleculas/FieldFormulario'
import * as DocumentPicker from 'expo-document-picker'
import * as Yup from 'yup'
import { getAdminTokens } from '../../../lib/services/notifications.services'
import { usePermissionsNotifications } from '../../../hooks/usePermissionsNotifications'
import { capitalize } from '../../../utils/capitalizeText'
import Spinner from '../../atomos/Spinner'
import { newVerifiedRequest } from '../../../lib/services/solicitud.services'
import { setElection } from '../../../redux/RegistroVerificado'

export interface User{
  username: string
  token_usuario: string
  admin: boolean
  tipo: string
  first_name: string
  last_name: string
  foto?: string
}

const VerifiedRegister = () => {
  const { authToken, user } = useSelector((state: RootState) => state.user)
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
  const [displayMenu, setDisplayMenu] = React.useState<boolean>(false)
  const { sendPushNotification } = usePermissionsNotifications()
  const [ img, setImg ] = React.useState<string>('caution')
  const [ text, setText ] = React.useState<string>('Hubo un error, intentelo más tarde por favor.')
  const [ isSubmitting, setIsSubmitting ] = React.useState<boolean>(false)
  const { users, isUserModified } = useSelector((state: RootState) => state.verificado)
  const [ missingInfo, setMissingInfo ] = React.useState<boolean>(false)
  const [ isEmpty, setIsEmpty ] = React.useState<boolean>(true)
  const dispatch = useDispatch()

  const handleSubmit = async (descripcion : string, imagen : DocumentPicker.DocumentResult[]) => {
    if(users.length > 0){
      setIsSubmitting(true)
      let list: any[] = []
      users.forEach(u=> list.push({username: u.username}))
      const foto = imagen[0] as any
      let imageLink = ''
      await uploadDoc(foto).then(response => imageLink = response )
      console.log(imageLink)
      const resp: string= await newVerifiedRequest(authToken??'', descripcion, imageLink, list)
      if(resp === 'success'){
        setImg('verificacion_envio')
        setText("Su solicitud ha sido enviada con éxito, un administrador revisará y responderá a su solicitud dentro de los siguientes días. En la sección “Solicitudes” podrá ver el estado y respuesta a su solicitud.")
        await sendNotificationToAdmins()
      }
      setMissingInfo(false)
      setIsSubmitting(false)
      setDisplayMenu(true)
    }else{
      setMissingInfo(true)
    }
  }

  const uploadDoc = async (doc: any) => {
    return (doc && isDocumentResultType(doc) && doc.type !== 'cancel') ? await guardarArchivo(
      FOLDERS_STORAGE.USUARIOS,
      doc.name,
      doc.uri
    ) : ''
  }

  const sendNotificationToAdmins = async () => {
    if (!authToken) return
    const tokens = await getAdminTokens(authToken)
    await sendPushNotification({
      tokens,
      title: 'Nueva solicitud de verificación de cuenta',
      body: `${capitalize(user?.first_name)} ${capitalize(user?.last_name)} ha enviado una solicitud de verificación de cuenta y necesita aprobación.`,
    })
  }

  React.useEffect(() => {
    (users.length === 0) ? setIsEmpty(true): setIsEmpty(false)
  }, [isUserModified])

  const imagen: DocumentPicker.DocumentResult[] = []

  return (
    <>
      <NotificationPopUp
        setVisible= {setDisplayMenu}
        visible= {displayMenu}
        imageName= {img}
        body={text}
        setConfirmation={() => navigation.navigate('Inicio')}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={tw`px-2 mb-8`}>
          <HeaderScreen
              title="Verificar cuenta"
              message="Verifica tu cuenta de Ecuaciclismo App"
              srcImage={require('../../../../assets/registro_local.png')}
          />
          <View style={tw`flex flex-col justify-center mt-4 mx-6`}>
            <Text style={tw`text-m text-black text-justify`}>
              Para ser un usuario verificado tiene que haber participado al menos en un 
              ciclopaseo o ruta y que hayan usuarios verificados, miembros o administradores 
              que puedan certificar que lo conocen.
            </Text>

            <View style={tw`bg-white py-4 px-2 mx-[1px] mt-3 border border-[#DFDFF0] rounded-2`}>
              <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
                Seleccione al menos un usuario que pueda certificar que lo conoce
              </Text>
              <View style={tw`flex flex-col justify-center items-center`}>
                <Pressable
                  style={tw`${BACKGROUND_COLORS.ORANGE} rounded-3xl mt-4 py-2 w-30 items-center justify-center`}
                  onPress={()=> {
                    dispatch(setElection({election: users}))
                    navigation.navigate('SeleccionarUsers')
                  }}
                >
                  <Text style={tw`text-m font-bold text-white`}>Seleccionar</Text>
                </Pressable>

                {!isEmpty ? (
                  <ScrollView
                    horizontal
                  >
                    {users.map((usuario) =>(
                      // eslint-disable-next-line react/jsx-key
                      <Image
                        source={
                          usuario.foto
                            ? { uri: usuario.foto }
                            : require('../../../../assets/user.png')
                        }
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 400 / 2,
                          marginHorizontal: 2,
                          marginTop: 10
                        }}
                        resizeMode="contain"
                      />
                    ))}
                  </ScrollView>
                ) : null}

                {missingInfo? (
                  <Text style={tw`text-xs ${TEXT_COLORS.ORANGE} my-2`}>Debe selecionar al menos un usuario que pueda certificar que lo conoce</Text>
                ) : null}
              </View>
            </View>

            <Formik
              initialValues = {{descripcion: '', imagen: imagen}}
              validationSchema = {Yup.object({
                descripcion: Yup.string()
                  .max(300, 'No puede ingresar más de 300 caracteres')
                  .min(2, 'No puede ingresar menos de 2 caracteres')
                  .required('Por favor, ingrese una descripción del porqué desea ser un usuario verificado'),
                imagen: Yup.array()
                  .min(1, 'Debe selecionar sólo una imagen')
                  .max(1, 'Debe selecionar sólo una imagen')
                  .required('Debe selecionar una imagen'),
              })}
              onSubmit = {(values)=> handleSubmit(values.descripcion, values.imagen)}
            >
              {({ values, setFieldValue, handleSubmit }) => (
                <>
                  <FieldFormulario>
                    <Input
                      multiline
                      numberOfLines={6}
                      text="Descripción"
                      type="none"
                      name="descripcion"
                      value={values.descripcion}
                      textAlignVertical="top"
                      stylesInput="pt-2"
                      setValue={(value) => setFieldValue('descripcion', value)}
                      placeholder="Agregue una descripción del porqué desea ser un usuario verificado..."
                    />
                  </FieldFormulario>

                  <FieldFormulario>
                    <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
                      Foto
                    </Text>
                    <GalleryMultiImages
                      field="imagen"
                      setFieldValue={setFieldValue}
                      values={ values.imagen }
                      allowedFiles={['image/*']}
                      icon={require('../../../../assets/gallery_icon.png')}
                      placeholder="Sube una imagen que compruebe que haz participado en una ruta"
                    />
                  </FieldFormulario>

                  <View style={tw`flex items-center justify-center my-8`}>
                    {isSubmitting ? (
                      <Spinner />
                    ) : (
                      <SecondaryButton
                        label= 'Enviar solicitud'
                        handleClick={handleSubmit}
                        style={`${BACKGROUND_COLORS.ORANGE} w-48 shadow-sm`}
                      />
                    )}
                  </View>
                </>
              )}
            </Formik>
          </View>
      </ScrollView>
      
    </>
  )
}

export default VerifiedRegister
