import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBicicletaHasModified } from "../../../redux/bicicleta";
import { RootDrawerParamList, RootStackParamList, Screens, ScreensDrawer } from "../../../models/Screens.types";
import { RootState } from "../../../redux/store";
import HeaderScreen from "../../moleculas/HeaderScreen";
import { ScrollView } from "react-native-gesture-handler";
import { Formik } from "formik";
import tw from 'twrnc'
import NotificationPopUp from "../../organismos/NotificationPopUp";
import { Bicicleta } from "../../../models/Bicicletas";
import { BicicletaValidationSchema } from "../../../schemas/BicicletaSchema";
import BicicletaContenidoFormulario from "./BicicletaContenidoFormulario";
import { agregarBicicleta } from "../../../lib/services/bicicleta.services";



const BicicletasFormulario = () => {
  const navigation =
    useNavigation<NavigationProp<RootDrawerParamList, ScreensDrawer>>()
  
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
    imagen: bicicletaProp?.imagen || [],
    token_usuario: bicicletaProp?.token_usuario || ''
  }
  const handleSubmit = async (bicicleta: Bicicleta) => {
    setIsLoading(true)
    if (authToken) {
      const response = await agregarBicicleta(bicicleta,authToken);
      if (response.status === 200) {
        setImg('verificacion_envio')
        setText("Bicicleta Registrada con Éxito")
      } else {
        setImg('caution')
        setText(response.data)
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
      <NotificationPopUp
        setVisible={setDisplayMenu}
        visible={displayMenu}
        imageName={img}
        body={text}
        setConfirmation={() => navigation.navigate('Bicicletas')}
      />
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
