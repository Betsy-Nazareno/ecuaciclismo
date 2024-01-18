import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBicicletaHasModified } from "../../../redux/bicicleta";
import { RootDrawerParamList, ScreensDrawer } from "../../../models/Screens.types";
import { RootState } from "../../../redux/store";
import HeaderScreen from "../../moleculas/HeaderScreen";
import { ScrollView } from "react-native-gesture-handler";
import { Formik, FormikState } from "formik";
import tw from 'twrnc'
import NotificationPopUp from "../../organismos/NotificationPopUp";
import { Bicicleta } from "../../../models/Bicicletas";
import { BicicletaValidationSchema } from "../../../schemas/BicicletaSchema";
import SecondaryButton from "../../atomos/SecondaryButton";
import Spinner from "../../atomos/Spinner";
import Input from "../../moleculas/Input";
import FieldFormulario from "../../moleculas/FieldFormulario";
import { View, Text } from "react-native";
import { BACKGROUND_COLORS, TEXT_COLORS, tipoModalidadBicicleta } from "../../../utils/constants";
import { agregarBicicleta } from "../../../lib/services/bicicleta.services";
import MediaPicker from "../../organismos/MediaPicker";
import { ImagePickerResult } from "expo-image-picker";
import SelectInput from "../../atomos/SelectInput";


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
    modelo: bicicletaProp?.modelo || '',
    n_serie: bicicletaProp?.n_serie || '',
    tienda_origen: bicicletaProp?.tienda_origen || '',
    factura: bicicletaProp?.factura || '',
    color: bicicletaProp?.color || '',
    modalidad: bicicletaProp?.modalidad || '',
    marca: bicicletaProp?.marca || '',
    imagen: bicicletaProp?.imagen || [],
  }

  const handleSubmit = async (bicicleta: Bicicleta, resetForm: {
    (nextState?: Partial<FormikState<{
      modelo: string; marca: string;
      imagen: ImagePickerResult[]; n_serie: string; tienda_origen: string;
      factura: string; color: string; modalidad: string;
    }>> | undefined): void; (): void;
  }) => {
    setIsLoading(true)
    if (authToken) {
      const data = await agregarBicicleta(bicicleta, authToken)
      const message: string = data?.status
      if (message === 'success') {
        setImg('verificacion_envio')
        setText("Su Bicicleta se ha enviado con éxito")
        resetForm(); // Limpia el formulario después del éxito

      }
    }
    dispatch(
      setBicicletaHasModified({
        bicicletaHasModified: !bicicletaHasModified
      })
    )
    setIsLoading(false)
    setDisplayMenu(true)
  };



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
          onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <>
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
                <Input
                  text="Modelo"
                  type="none"
                  name="modelo"
                  value={values.modelo}
                  textAlignVertical="top"
                  stylesInput="pt-2"
                  setValue={(value) => setFieldValue('modelo', value)}
                  placeholder="Especifica el Modelo de tu bicicleta..."
                />
              </FieldFormulario>
              <FieldFormulario>
                <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
                  Modalidad
                </Text>
                <SelectInput
                  values={tipoModalidadBicicleta}
                  accessibilityLabel='modalidad'
                  placeholder="Selecciona la modalidad de tu bicicleta"
                  setValuesSelected={(value) => setFieldValue('modalidad', value)}
                  selectedValue={values.modalidad}
                />
              </FieldFormulario>

              <FieldFormulario>
                <Input
                  text="Numero de Serie o Chasis"
                  type="none"
                  name="n_serie"
                  value={values.n_serie}
                  textAlignVertical="top"
                  stylesInput="pt-2"
                  setValue={(value) => setFieldValue('n_serie', value)}
                  placeholder="Especifica el número de serie o chasis de tu bicicleta..."
                />
              </FieldFormulario>
              <FieldFormulario>
                <Input
                  text="Tienda de Origen"
                  type="none"
                  name="tienda_origen"
                  value={values.tienda_origen}
                  textAlignVertical="top"
                  stylesInput="pt-2"
                  setValue={(value) => setFieldValue('tienda_origen', value)}
                  placeholder="Especifica el número de serie de tu bicicleta..."
                />
              </FieldFormulario>
              <FieldFormulario>
                <Input
                  text="Factura"
                  type="none"
                  name="factura"
                  value={values.factura}
                  textAlignVertical="top"
                  stylesInput="pt-2"
                  setValue={(value) => setFieldValue('factura', value)}
                  placeholder="Especifica la factura de tu bicicleta..."
                />
              </FieldFormulario>
              <FieldFormulario>
                <Input
                  text="Color"
                  type="none"
                  name="color"
                  value={values.color}
                  textAlignVertical="top"
                  stylesInput="pt-2"
                  setValue={(value) => setFieldValue('color', value)}
                  placeholder="Especifica el color de tu bicicleta..."
                />
              </FieldFormulario>
              <FieldFormulario>
                <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
                  Imagen
                </Text>
                <MediaPicker
                  field="imagen"
                  icon={require('../../../../assets/gallery_icon.png')}
                  placeholder="Puedes tomar fotos desde la galeria"
                  setFieldValue={setFieldValue}
                  values={values.imagen}

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
