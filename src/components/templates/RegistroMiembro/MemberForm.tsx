import { NavigationProp, useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import tw from 'twrnc'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import HeaderScreen from '../../moleculas/HeaderScreen'
import MemberFormFields from './MemberFormFields'
import { Formik } from 'formik'
import { RegistroMiembroSchema } from '../../../schemas/RegistroMiembroSchema'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RegistroMiembro } from '../../../models/RegistroMiembro'

interface MemberFormProps {
  initValues?: RegistroMiembro
}

const MemberForm = ({ initValues }: MemberFormProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList, Screens>>()

  const initialValues: RegistroMiembro = {
      nombre: initValues?.nombre || "",
      num_ced: initValues?.num_ced || "",
      fecha_nacimiento: initValues?.fecha_nacimiento || "",
      celular: initValues?.celular || "",
      direccion: initValues?.direccion || "",
      ciudad: initValues?.ciudad || "",
      ocupacion: initValues?.ocupacion || "",
      seguro_med: initValues?.seguro_med || "",
      tipo_sangre: initValues?.tipo_sangre || "",
      contacto_emergencia: initValues?.contacto_emergencia || "",
      payment: initValues?.payment || [],
      cedula: initValues?.cedula || [],
      imagen: initValues?.imagen || [],
  }  

  const handleSubmit = async (values: RegistroMiembro) => {
    try {
      const jsonValue = JSON.stringify(values)
      await AsyncStorage.setItem('registro-miembro-key', jsonValue)
    } catch (e) {
      console.error(e)
    }
    navigation.navigate('PaginaDescargaMiembro')
  }
  
  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      style={tw`px-2 mb-8`}
    >
      <HeaderScreen
        title="Registro de miembro"
        message="Forma parte de los miembros de la comunidad de Ecuaciclismo App"
        srcImage={require('../../../../assets/registro_local.png')}
      />
      <Formik<RegistroMiembro>
        initialValues = {initialValues}
        validationSchema={RegistroMiembroSchema}
        onSubmit = {handleSubmit}
      >
        <MemberFormFields/>
      </Formik>
    </ScrollView>
  )
}

export default MemberForm
