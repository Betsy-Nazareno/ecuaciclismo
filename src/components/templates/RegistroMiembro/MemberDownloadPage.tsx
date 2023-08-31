import { NavigationProp, useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import tw from 'twrnc'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import { RootState } from '../../../redux/store'
import HeaderScreen from '../../moleculas/HeaderScreen'
import { RegistroMiembro } from '../../../models/RegistroMiembro'
import { html } from '../../../../assets/documents/Solicitud_registro_miembro'
import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'
import ConfirmationPopUp from '../../organismos/ConfirmationPopUp'
import NotificationPopUp from '../../organismos/NotificationPopUp'
import SecondaryButton from '../../atomos/SecondaryButton'
import GalleryMultiImages from '../../organismos/GalleryMultiImages'
import { BACKGROUND_COLORS, TEXT_COLORS, FOLDERS_STORAGE, MIME_TYPES } from '../../../utils/constants'
import UnfocusButton from '../../atomos/UnfocusButton'
import { Text, View, Pressable, Image, Platform } from 'react-native'
import { Formik } from 'formik'
import FieldFormulario from '../../moleculas/FieldFormulario'
import * as DocumentPicker from 'expo-document-picker'
import * as Yup from 'yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { isDocumentResultType } from '../../../utils/ckeckTypes'
import { newMemberRequest } from '../../../lib/services/solicitud.services'
import { guardarArchivo, eliminarArchivo } from '../../../lib/googleCloudStorage'
import { getAdminTokens } from '../../../lib/services/notifications.services'
import { usePermissionsNotifications } from '../../../hooks/usePermissionsNotifications'
import { capitalize } from '../../../utils/capitalizeText'
import Spinner from '../../atomos/Spinner'
import * as FileSystem from 'expo-file-system'

const DescargarPDF = () => {
  const { authToken, user } = useSelector((state: RootState) => state.user)
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
  const [initValues, setInitValues] = React.useState<RegistroMiembro>()
  const [displayMenu, setDisplayMenu] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const { sendPushNotification } = usePermissionsNotifications()
  const [ img, setImg ] = React.useState<string>('caution')
  const [ text, setText ] = React.useState<string>('Hubo un error, intentelo más tarde por favor.')
  const [ isCharging, setIsCharging ] = React.useState<boolean>(false)
  const [ isSubmitting, setIsSubmitting ] = React.useState<boolean>(false)
  
  React.useEffect(() => {
    (async () => await getData())()
  }, [])

  const getData = async () => {
    try {
      let jsonValue = null
      while(jsonValue === null)
        jsonValue = await AsyncStorage.getItem('registro-miembro-key')
      setInitValues(JSON.parse(jsonValue))
    } catch (e) {
      console.error(e)
    }
  }

  const handleDownload = async () => {
    setIsCharging(true)

    await getData()
    const fecha = new Date(Date.now())
    const fecha_registro = `${fecha.getDate().toString()}/${(fecha.getMonth()+1).toString()}/${fecha.getFullYear().toString()}`
    const email: string= user?.email??''
    let cedula1 = ''
    let cedula2 = ''
    let payment = ''
    
    const imagenc1 = initValues?.cedula[0] as any
    await uploadDoc(imagenc1).then(response => cedula1 = response )
    
    const imagenc2 = initValues?.cedula[1] as any
    await uploadDoc(imagenc2).then(response => cedula2 = response )

    if(initValues?.payment && (initValues?.payment.length > 0)){
      const imagenp = initValues?.payment[0] as any
      await uploadDoc(imagenp).then(response => payment = response )
    }
    
    const file = await printToFileAsync({
      html: html(fecha_registro,
        initValues?.nombre || '',
        initValues?.direccion || '',
        initValues?.celular || '',
        initValues?.fecha_nacimiento || '',
        cedula1,
        cedula2,
        initValues?.tipo_sangre || '',
        initValues?.ocupacion || '',
        email,
        initValues?.ciudad || '',
        initValues?.seguro_med || '',
        initValues?.contacto_emergencia || '',
        payment,
        initValues?.num_ced || ''),
      base64:false
    })    
    
    const PDFlink : string = await guardarArchivo(FOLDERS_STORAGE.LUGARES, 'Solicitud_registro_miembro.pdf', file.uri)
    const fileName : string = 'Solicitud_registro_miemrbo.pdf'
    const result = await FileSystem.downloadAsync(
      PDFlink,
      FileSystem.documentDirectory + fileName
    )
    
    await save(result.uri, fileName)
    
    await eliminarArchivo(PDFlink)
    await eliminarArchivo(cedula1)
    await eliminarArchivo(cedula2)
    await eliminarArchivo(payment)
    setIsCharging(false)
  }
  
  const uploadDoc = async (doc: any) => {
    return (doc && isDocumentResultType(doc) && doc.type !== 'cancel') ? await guardarArchivo(
      FOLDERS_STORAGE.LUGARES,
      doc.name,
      doc.uri
    ) : ''
  }

  const save = async (uri: string, fileName: string) => {
    if(Platform.OS === 'android'){
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()
      if (permissions.granted){
        const base64 = await FileSystem.readAsStringAsync(uri, {encoding: FileSystem.EncodingType.Base64})
        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, MIME_TYPES.PDF).then(
          async (uri) => {
            FileSystem.writeAsStringAsync(uri, base64, {encoding: FileSystem.EncodingType.Base64})
          }
        ).catch(
          e => console.error(e)
        )
      } else {
        shareAsync(uri)
      }
    } else {
      shareAsync(uri)
    }
  }

  const handleSubmit = async (document: DocumentPicker.DocumentResult) => {
    setIsSubmitting(true)
    await getData()
    if(initValues){
      let path_PDF = ''
      await uploadDoc(document).then(response => path_PDF = response )
      const resp: string= await newMemberRequest(authToken??'', path_PDF)
      if(resp === 'success'){
        setImg('verificacion_envio')
        setText("Su solicitud ha sido enviada con éxito, un administrador revisará y responderá a su solicitud dentro de los siguientes días. En la sección “Solicitudes” podrá ver el estado y respuesta a su solicitud.")
        try {
          await AsyncStorage.removeItem('registro-miembro-key')
        } catch(e) {
          console.error(e)
        }
        await sendNotificationToAdmins()
      }
    }
    setIsSubmitting(false)
    setDisplayMenu(true)
  }

  const sendNotificationToAdmins = async () => {
    if (!authToken) return
    const tokens = await getAdminTokens(authToken)
    await sendPushNotification({
      tokens,
      title: 'Nueva solicitud de registro de miembro',
      body: `${capitalize(user?.first_name)} ${capitalize(user?.last_name)} ha enviado una solicitud de registro de miembro y necesita aprobación.`,
    })
  }

  const handleCancel = async () => {
    try {
      await AsyncStorage.removeItem('registro-miembro-key')
      setText('Su registro ha sido cancelado.')
    } catch(e) {
      console.error(e)
    }
    setShowModal(false)
    setDisplayMenu(true)
  }

  const archivo: DocumentPicker.DocumentResult[] = []

  return (
    <>
      <ConfirmationPopUp
        setVisible={setShowModal}
        visible={showModal}
        imageName= 'caution'
        body= 'No podemos asegurarle que su dinero sea devuelto si cancela su registro en este momento y ya ha realizado el pago del registro. ¿Desea proseguir con la cancelación del registro de todas formas?'
        setConfirmation={handleCancel}
      />

      <NotificationPopUp
        setVisible= {setDisplayMenu}
        visible= {displayMenu}
        imageName= {img}
        body={text}
        setConfirmation={() => navigation.navigate('Inicio')}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={tw`px-2 mb-8`}>
          <HeaderScreen
              title="Registro de miembro"
              message="Forma parte de los miembros de la comunidad de Ecuaciclismo App"
              srcImage={require('../../../../assets/registro_local.png')}
          />
          <View style={tw`flex flex-col justify-center mt-4 mx-6`}>
            <Text style={tw`text-m text-black text-justify`}>
              Descarga y firma el documento PDF que se
              generó automaticamente con los datos que
              llenaste en el formulario anterior (la firma
              puede ser digital o hecha a mano).
            </Text>
            
            {isCharging ? (
              <Spinner />
            ) : (
              <Pressable onPress={handleDownload} style={tw`items-center`}>
                <View style={tw`flex flex-row items-center justify-center w-5/6 my-2 p-2 rounded-lg border border-[#0C3248]`}>
                  <Text style={tw`text-m text-black`}>
                    Descargar documento
                  </Text>
                  <Image source={require('../../../../assets/download.png')} style={{width: 25, height: 25,}}/>
                </View>
              </Pressable>
            )}

            <Pressable 
              onPress={async () => {
                await getData()
                navigation.navigate('FormularioMiembro', {initValues})
              }}
            >
              <Text style={tw`text-m text-center font-bold underline ${TEXT_COLORS.DARK_BLUE}`}>
                Volver a llenar el formulario
              </Text>
            </Pressable>

            <Text style={tw`text-m text-black text-justify mt-6`}>
              Sube el documento ya firmado
            </Text>

            <Formik
              initialValues = {{archivo: archivo}}
              validationSchema = {Yup.object({
                archivo: Yup.array()
                  .min(1, 'Debe selecionar sólo un archivo')
                  .max(1, 'Debe selecionar sólo un archivo')
                  .required('Debe selecionar un archivo'),
              })}
              onSubmit = {(val)=> handleSubmit(val.archivo[0])}
            >
              {({ values, setFieldValue, handleSubmit }) => (
                <>
                  <FieldFormulario>
                    <GalleryMultiImages
                      field="archivo"
                      setFieldValue={setFieldValue}
                      values={ values.archivo }
                      allowedFiles={['application/pdf']}
                      icon={require('../../../../assets/pdf_icon.png')}
                      placeholder="Sólo puedes subir un archivo PDF"
                    />
                  </FieldFormulario>

                  <View style={tw`flex flex-row items-center justify-center my-8`}>
                    <UnfocusButton
                      label="Cancelar"
                      style="w-full mr-18"
                      handleClick={()=> setShowModal(true)}
                    />
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

export default DescargarPDF
