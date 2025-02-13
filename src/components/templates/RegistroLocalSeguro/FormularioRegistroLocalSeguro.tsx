import { NavigationProp, useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import tw from 'twrnc'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import HeaderScreen from '../../moleculas/HeaderScreen'
import FormularioRegistroLocalSeguroCampos from './FormularioRegistroLocalSeguroCampos'
import { Formik } from 'formik'
import { RegistroLocalSeguro } from '../../../models/RegistroLocalSeguro'
import { RegistroLocalSeguroSchema, RegistroLocalSeguroFreeSchema } from '../../../schemas/RegistroLocalSeguroSchema'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface FormularioRegistroLocalSeguroProps {
  registerType: string
  initValues?: RegistroLocalSeguro
}

const FormularioRegistroLocalSeguro = ({ registerType, initValues }: FormularioRegistroLocalSeguroProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList, Screens>>()

  const initialValues: RegistroLocalSeguro = {
      nombre: initValues?.nombre || "",
      servicio: initValues?.servicio || "",
      descripcion: initValues?.descripcion || "",
      parqueadero: initValues?.descripcion || undefined,
      ciudad: initValues?.ciudad || "",
      direccion: initValues?.direccion || "",
      ubicacion:{
        coordinateX: {
            latitude: initValues?.ubicacion.coordinateX.latitude || -2.1538019492930163,
            longitude: initValues?.ubicacion.coordinateX.longitude || -79.88844282925129,
            },
        coordinateY: {
            latitude: initValues?.ubicacion.coordinateY.latitude || -2.1538019492930163,
            longitude: initValues?.ubicacion.coordinateY.longitude || -79.88844282925129,
            }
      },
      celular: initValues?.celular || "",
      hora_inicio: initValues?.hora_inicio || "",
      hora_fin: initValues?.hora_fin || "",
      payment: initValues?.payment || [],
      cedula: initValues?.cedula || [],
      imagen: initValues?.imagen || [],
      registerType: registerType,
  }  

  const handleSubmit = async (values: RegistroLocalSeguro) => {
    values.registerType = registerType
    if(registerType === 'Plan gratuito' )
      values.payment = []
    try {
      const jsonValue = JSON.stringify(values)
      await AsyncStorage.setItem('registro-local-seguro-key', jsonValue)
    } catch (e) {
      console.error(e)
    }
    navigation.navigate('DescargarSubirPDF')
  }
  
  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      style={tw`px-2 mb-8`}
    >
        <HeaderScreen
            title="Registro de local seguro"
            message="Forma parte de los locales seguros"
            srcImage={require('../../../../assets/registro_local.png')}
        />
        {(registerType !== 'Plan gratuito') ? (
          <Formik<RegistroLocalSeguro>
            initialValues = {initialValues}
            validationSchema={RegistroLocalSeguroSchema}
            onSubmit = {handleSubmit}
          >
            <FormularioRegistroLocalSeguroCampos registerType={registerType} initialValues={initialValues} charge={true}/>
          </Formik>
        ) : (
          <Formik<RegistroLocalSeguro>
            initialValues = {initialValues}
            validationSchema={RegistroLocalSeguroFreeSchema}
            onSubmit = {handleSubmit}
          >
            <FormularioRegistroLocalSeguroCampos registerType={registerType} initialValues={initialValues} charge={true}/>
          </Formik>
        )}
    </ScrollView>
  )
}

export default FormularioRegistroLocalSeguro
