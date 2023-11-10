import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBicicletaHasModified } from "../../../redux/bicicleta";
import { RootStackParamList, Screens } from "../../../models/Screens.types";
import { RootState } from "../../../redux/store";
import HeaderScreen from "../../moleculas/HeaderScreen";
import { ScrollView } from "react-native-gesture-handler";
import { Formik } from "formik";
import tw from 'twrnc'
import NotificationPopUp from "../../organismos/NotificationPopUp";
import { Bicicleta } from "../../../models/Bicicletas";
import { BicicletaValidationSchema } from "../../../schemas/BicicletaSchema";
import BicicletaContenidoFormulario from "./BicicletaContenidoFormulario";


interface Props {
  tokenUsuario: string
}

const BicicletasFormulario = ({tokenUsuario}:Props) => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const [isLoading, setIsLoading] = React.useState(false)
  const [bicicletaProp] = React.useState<Bicicleta>()
  const { bicicletaHasModified } = useSelector(
    (state: RootState) => state.bicicleta
  )
  const dispatch = useDispatch()
  const [displayMenu, setDisplayMenu] = React.useState(false)
  const [img, setImg] = React.useState<string>('caution')
  const [text, setText] = React.useState<string>('Hubo un error, intentelo más tarde por favor.')





  const initialValues = {
    codigo: bicicletaProp?.codigo || '',
    tipo: bicicletaProp?.tipo || '',
    marca: bicicletaProp?.marca || '',
    imagen: bicicletaProp?.imagen || '',
    token_usuario: bicicletaProp?.token_usuario || ''
  }
  const handleSubmit = async (bicicleta: Bicicleta) => {
    setIsLoading(true)

    if (authToken) {

      const message: string = 'success'
      if (message === 'success') {
        setImg('verificacion_envio')
        setText("Bicicleta Registrada con Éxito")
      }

    }
    dispatch(
      setBicicletaHasModified({
        bicicletaHasModified: !bicicletaHasModified
      })

    )
    setIsLoading(false)
    setDisplayMenu(true)
  }

  return (
    <>
      
      <ScrollView showsVerticalScrollIndicator={false} style={tw`px-2 mb-8`}>
        <HeaderScreen
        
          title="Registra tu Bicicleta"
          message="Proporciona información sobre tu bicicleta"
          srcImage={require('../../../../assets/alertaBanner.png')}
        />
        <Formik

          initialValues={initialValues}
          validationSchema={BicicletaValidationSchema}
          onSubmit={handleSubmit}
        >
          <BicicletaContenidoFormulario isSubmiting={isLoading}
          />

        </Formik>
      </ScrollView>
    </>
  )
}

export default BicicletasFormulario
