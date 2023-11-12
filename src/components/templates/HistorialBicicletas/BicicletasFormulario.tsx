import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBicicletaHasModified } from "../../../redux/bicicleta";
import { RootDrawerParamList, ScreensDrawer } from "../../../models/Screens.types";
import { RootState } from "../../../redux/store";
import HeaderScreen from "../../moleculas/HeaderScreen";
import { ScrollView } from "react-native-gesture-handler";
import { Formik } from "formik";
import tw from 'twrnc'
import NotificationPopUp from "../../organismos/NotificationPopUp";
import { Bicicleta } from "../../../models/Bicicletas";
import { BicicletaValidationSchema } from "../../../schemas/BicicletaSchema";
import SecondaryButton from "../../atomos/SecondaryButton";
import Spinner from "../../atomos/Spinner";
import Input from "../../moleculas/Input";
import FieldFormulario from "../../moleculas/FieldFormulario";
import { View, Text, ImageSourcePropType } from "react-native";
import { BACKGROUND_COLORS, TEXT_COLORS, tipoAlertas } from "../../../utils/constants";
import SelectInput from "../../atomos/SelectInput";
import GalleryButton from "../../moleculas/GalleryButton";


interface BicicletasFormularioProps {
  Prop?: Bicicleta
}

const BicicletasFormulario = ({
  Prop
}: BicicletasFormularioProps) => {
  const navigation =
    useNavigation<NavigationProp<RootDrawerParamList, ScreensDrawer>>()

  const { authToken } = useSelector((state: RootState) => state.user)
  const [isLoading, setIsLoading] = React.useState(false)
  const [bicicletaProp, setbicicletaProp] = React.useState<Bicicleta>()
  const { bicicletaHasModified } = useSelector(
    (state: RootState) => state.bicicleta
  )
  const dispatch = useDispatch()
  const [displayMenu, setDisplayMenu] = React.useState(false)
  const [img, setImg] = React.useState<string>('caution')
  const [text, setText] = React.useState<string>('Hubo un error, intentelo más tarde por favor.')

  React.useEffect(() => {
    setbicicletaProp(Prop)
  }, []);
  const initialValues = {
    codigo: bicicletaProp?.codigo || '',
    tipo: bicicletaProp?.tipo || '',
    marca: bicicletaProp?.marca || '',
    imagen: bicicletaProp?.imagen
  }

  const handleSubmit = async (bicicleta: Bicicleta) => {
    if (authToken) {
      console.log("hola mundo")
    }

    setImg('verificacion_envio')
    setText("Su solicitud ha sido enviada con éxito, un administrador revisará y responderá a su solicitud dentro de los siguientes días. En la sección “Solicitudes” podrá ver el estado y respuesta a su solicitud.")
    console.log(bicicleta)
    setIsLoading(true)
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
          {({ handleSubmit, values, setFieldValue }) => (
            <>
              <FieldFormulario>
                <Input
                  text="Código"
                  type="none"
                  name="codigo"
                  value={values.codigo}
                  textAlignVertical="top"
                  stylesInput="pt-2"
                  setValue={(value) => setFieldValue('codigo', value)}
                  placeholder="Agrega el código de tu bicicleta..."
                />
              </FieldFormulario>
              <FieldFormulario>
                <Input
                  text="Marca"
                  type="none"
                  name="marca"
                  value={values.marca}
                  textAlignVertical="top"
                  stylesInput="pt-2"
                  setValue={(value) => setFieldValue('marca', value)}
                  placeholder="Especifica la marca de tu bicicleta..."
                />

              </FieldFormulario>
              <FieldFormulario>
                <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
                  Tipo
                </Text>
                <SelectInput

                  values={tipoAlertas}
                  placeholder="Selecciona un tipo"
                  setValuesSelected={(value) => (setFieldValue('tipo', value))}
                  selectedValue={values.tipo}
                />
              </FieldFormulario>

              <FieldFormulario>
                <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
                  Imagen
                </Text>
                <GalleryButton
                  field="imagen"
                  icono={require('../../../../assets/gallery_icon.png')}
                  imagen={values.imagen as ImageSourcePropType}
                />
              </FieldFormulario>

              {isLoading ? (
                <Spinner />
              ) : (
                <View style={tw`flex flex-row justify-center items-center my-6`}>

                  <SecondaryButton
                    label="Registrar Bicicleta"
                    handleClick={handleSubmit}
                    style={`${BACKGROUND_COLORS.ORANGE} w-48 shadow-sm`}
                  />
                </View>
              )}
            </>
          )}

        </Formik>
      </ScrollView>
    </>
  )
}

export default BicicletasFormulario
