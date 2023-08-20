import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStackParamList, Screens } from "../../../models/Screens.types";
import { RootState } from "../../../redux/store";
import HeaderScreen from "../../moleculas/HeaderScreen";
import { ScrollView } from "react-native-gesture-handler";
import { Formik } from "formik";
import tw from 'twrnc'
import { Lugar } from "../../../models/Lugares";
import { setLugarHasModified } from "../../../redux/lugar";
import { new_lugar } from "../../../lib/services/lugares.services";
import LugarContenidoFormulario from "./LugarContenidoFormulario";
import { LugarValidationSchema } from "../../../schemas/LugarSchema";
import { new_solicitud_lugar } from "../../../lib/services/solicitud.services";
interface LugarFormularioProps {
    Prop?: Lugar,
    longitud: number,
    latitud: number,
  }

  const LugarFormularioTemplate = ({
    Prop,
    longitud,
    latitud,
  }: LugarFormularioProps) => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [lugarProp, setLugarProp] = React.useState<Lugar>()
    const { authToken } = useSelector((state: RootState) => state.user)
    const navigation =
      useNavigation<NavigationProp<RootStackParamList, Screens>>()
    const {lugarHasModified} = useSelector((state: RootState) => state.lugar)

    const dispatch = useDispatch()
  
    React.useEffect(() => {
      setLugarProp(Prop)
    }, [])
  
    const initialValues = {
        nombre: lugarProp?.nombre || '',
      descripcion: lugarProp?.descripcion || '',
      direccion: lugarProp?.direccion || '',
      imagen: lugarProp?.imagen || '',
      tipo: lugarProp?.tipo || '',
      ubicacion: {
        coordinateX: {
          latitude: latitud,
          longitude: longitud,
        },
        coordinateY: {
          latitude: -2.1453200715782175,
          longitude: -79.89056378602983,
        }
      },

    }
  
    const handleSubmit = async (lugar: Lugar) => {
      setIsLoading(true)
      if (authToken) {
         const token_lugar=await new_lugar(authToken,lugar)
         await new_solicitud_lugar(authToken,token_lugar)
      }
      dispatch(
        setLugarHasModified({
          lugarHasModified: !lugarHasModified,
        })
      )
      setIsLoading(false)
      navigation.goBack()
    }
    const handleCancel = () => {
        navigation.goBack()
    }
  
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={tw`px-2 mb-8`}>
        <HeaderScreen
          title="Recomienda un Lugar"
          message="¡Comparte tus lugare con nosotros!"
          srcImage={require('../../../../assets/recomendar.png')}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={LugarValidationSchema}
          onSubmit={handleSubmit}
          
        >
          <LugarContenidoFormulario
            isSubmiting={isLoading}
            onCancel={handleCancel}
            
          />
        </Formik>
      </ScrollView>
    )
  }
  
  export default LugarFormularioTemplate
  