import { NavigationProp, useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import tw from 'twrnc'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import { RootState } from '../../../redux/store'
import HeaderScreen from '../../moleculas/HeaderScreen'
import { RegistroLocalSeguro } from '../../../models/RegistroLocalSeguro'
import { html } from '../../../../assets/documents/Solicitud_registro_local_seguro'
import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'
import ConfirmationPopUp from '../../organismos/ConfirmationPopUp'
import SecondaryButton from '../../atomos/SecondaryButton'
import GalleryMultiImages from '../../organismos/GalleryMultiImages'
import { BACKGROUND_COLORS, TEXT_COLORS, FOLDERS_STORAGE } from '../../../utils/constants'
import UnfocusButton from '../../atomos/UnfocusButton'
import { Text, View, Pressable, Image } from 'react-native'
import { Formik } from 'formik'
import FieldFormulario from '../../moleculas/FieldFormulario'
import * as DocumentPicker from 'expo-document-picker'
import * as Yup from 'yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { isDocumentResultType } from '../../../utils/ckeckTypes'
import { newLocalSeguro } from '../../../lib/services/lugar.services'
import { newPlaceRequest } from '../../../lib/services/solicitud.services'
import { guardarArchivo, eliminarArchivo } from '../../../lib/googleCloudStorage'
import { getAdminTokens } from '../../../lib/services/notifications.services'
import { usePermissionsNotifications } from '../../../hooks/usePermissionsNotifications'
import { capitalize } from '../../../utils/capitalizeText'
import * as FileSystem from 'expo-file-system'

const DescargarPDF = () => {
  const { authToken, user } = useSelector((state: RootState) => state.user)
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
  const [initValues, setInitValues] = React.useState<RegistroLocalSeguro>()
  const [showModal, setShowModal] = React.useState(false)
  const { sendPushNotification } = usePermissionsNotifications()
  const [ text, setText ] = React.useState<string>('')

  
  React.useEffect(() => {
    (async () => await getData())()
  }, [])
  

  const getData = async () => {
    try {
      let jsonValue = null
      while(jsonValue === null)
        jsonValue = await AsyncStorage.getItem('registro-local-seguro-key')
      setInitValues(JSON.parse(jsonValue))
      console.log(initValues)
      console.log('\n\n----------------------------------Descargar PDF-----------------------------------------------\n\n')
    } catch (e) {
      console.error(e)
    }
  }

  const handleDownload = async () => {
    await getData()
    let fecha = new Date(Date.now())
    let fecha_registro: string = `${fecha.getDate().toString()}/${(fecha.getMonth()+1).toString()}/${fecha.getFullYear().toString()}`
    let owner: string = (user?.first_name??'')+' '+(user?.last_name??'')
    let email: string= user?.email??''
    let parqueadero: string = (initValues?.parqueadero===1) ? 'Sí' : 'No'
    let cedula1: string = ''
    let cedula2: string = ''
    let payment: string = 'https://raw.githubusercontent.com/Betsy-Nazareno/ecuaciclismo/main/assets/celebracion_icon.png'

    let imagenc1 = initValues?.cedula[0] as any
    await uploadDoc(imagenc1).then(response => cedula1 = response )
    
    let imagenc2 = initValues?.cedula[1] as any
    await uploadDoc(imagenc2).then(response => cedula2 = response )

    if(initValues?.payment && (initValues?.payment.length > 0) && initValues?.registerType !== 'Plan gratuito'){
      let imagenp = initValues?.payment[0] as any
      await uploadDoc(imagenp).then(response => payment = response )
    }

    const file = await printToFileAsync({
      html: html(fecha_registro,
        initValues?.nombre || '',
        initValues?.direccion || '',
        initValues?.celular || '',
        owner,
        cedula1,
        cedula2,
        email,
        initValues?.servicio || '',
        initValues?.hora_inicio || '',
        initValues?.hora_fin || '',
        initValues?.ciudad || '',
        parqueadero,
        payment),
      base64:false
    })

    //const PDFlink : string = await guardarArchivo(FOLDERS_STORAGE.LUGARES, 'Solicitud_registro_local_seguro.pdf', file.uri)
    //const fileName : string = 'Solicitud_registro_local_seguro.pdf'
    
    /*const result = await FileSystem.downloadAsync(
      PDFlink,
      FileSystem.documentDirectory + fileName
    )
    */
    shareAsync(file.uri)
    
    //await eliminarArchivo(PDFlink)
    await eliminarArchivo(cedula1)
    await eliminarArchivo(cedula2)
    if(initValues?.payment && (initValues?.payment.length > 0) && initValues?.registerType !== 'Plan gratuito')
      await eliminarArchivo(payment)
  }
  
  const uploadDoc = async (doc: any) => {
    return (doc && isDocumentResultType(doc) && doc.type !== 'cancel') ? await guardarArchivo(
      FOLDERS_STORAGE.LUGARES,
      doc.name,
      doc.uri
    ) : ''
  }

  const handleSubmit = async (document: DocumentPicker.DocumentResult) => {
    await getData()
    if(initValues){
      let isBeneficios: number = (initValues?.registerType !== 'Plan gratuito') ? 1 : 0
      let imagen = initValues?.imagen[0] as any
      let imageLink: string = ''
      await uploadDoc(imagen).then(response => imageLink = response )
      let resp1= await newLocalSeguro(authToken??'', initValues, isBeneficios, imageLink)
      if(resp1?.status === 'success'){
        let path_PDF: string = ''
        await uploadDoc(document).then(response => path_PDF = response )
        let resp2: string= await newPlaceRequest(authToken??'', resp1.token_lugar, path_PDF)
        if(resp2 === 'success'){
          setText("Su solicitud ha sido enviada con exito, un administrador revisará y responderá a su solicitud dentro de los siguientes días. En la sección “Solicitudes” podrá ver el estado y respuesta a su solicitud.")
          try {
            await AsyncStorage.removeItem('registro-local-seguro-key')
          } catch(e) {
            console.error(e)
          }
          await sendNotificationToAdmins()
        }else
          setText('Hubo un error, intentelo más tarde por favor.')
      }else
        setText('Hubo un error, intentelo más tarde por favor.')
    }else
      setText('Hubo un error, intentelo más tarde por favor.')
    setShowModal(true)
  }

  const sendNotificationToAdmins = async () => {
    if (!authToken) return
    const tokens = await getAdminTokens(authToken)
    await sendPushNotification({
      tokens,
      title: 'Solicitud de registro de local seguro',
      body: `${capitalize(user?.first_name)} ${capitalize(user?.last_name)} ha enviado solicitud de registro de local seguro y necesita aprobación.`,
    })
  }

  const handleCancel = async () => {
    try {
      await AsyncStorage.removeItem('registro-local-seguro-key')
      setText('Su registro ha sido cancelado.')
    } catch(e) {
      setText('Hubo un error, intentelo más tarde por favor.')
      console.error(e)
    }
    setShowModal(true)
  }

  let registerType: string = initValues?.registerType || ''

  let archivo: DocumentPicker.DocumentResult[] = []

  return (
    <>
      <ConfirmationPopUp
        setVisible={setShowModal}
        visible={showModal}
        imageName='verificacion_envio'
        body={text}
        setConfirmation={() => navigation.navigate('Inicio')}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={tw`px-2 mb-8`}>
          <HeaderScreen
              title="Registro de local seguro"
              message="Forma parte de los locales seguros"
              srcImage={require('../../../../assets/registro_local.png')}
          />
          <View style={tw`flex flex-col justify-center mt-4 mx-6`}>
            <Text style={tw`text-m text-black text-justify`}>
              Descarga y firma el documento PDF que se
              generó automaticamente con los datos que
              llenaste en el formulario anterior (la firma
              puede ser digital o hecha a mano).
            </Text>

            <Pressable onPress={handleDownload} style={tw`items-center`}>
              <View style={tw`flex flex-row items-center justify-center w-5/6 my-2 p-2 rounded-lg border border-[#0C3248]`}>
                <Text style={tw`text-m text-black`}>
                  Descargar documento
                </Text>
                <Image source={require('../../../../assets/download.png')} style={{width: 25, height: 25,}}/>
              </View>
            </Pressable>

            <Pressable 
              onPress={async () => {
                await getData()
                navigation.navigate('RegistroLocalSeguroFormulario', {registerType, initValues})
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
                      handleClick={handleCancel}
                    />
                    <SecondaryButton
                      label= 'Enviar solicitud'
                      handleClick={handleSubmit}
                      style={`${BACKGROUND_COLORS.ORANGE} w-48 shadow-sm`}
                    />
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
