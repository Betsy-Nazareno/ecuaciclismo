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
import { newPlaceRequest} from "../../../lib/services/solicitud.services";
import NotificationPopUp from "../../organismos/NotificationPopUp";
import { getAdminTokens } from "../../../lib/services/notifications.services";
import { usePermissionsNotifications } from "../../../hooks/usePermissionsNotifications";
import { capitalize } from "../../../utils/capitalizeText";
const { sendPushNotification } = usePermissionsNotifications()

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
    const [displayMenu, setDisplayMenu] = React.useState(false)
    const [ img, setImg ] = React.useState<string>('caution')
    const [ text, setText ] = React.useState<string>('Hubo un error, intentelo más tarde por favor.')

    const [isLoading, setIsLoading] = React.useState(false)
    const [lugarProp, setLugarProp] = React.useState<Lugar>()
    const { authToken, user } = useSelector((state: RootState) => state.user)
    const navigation = useNavigation<NavigationProp<RootStackParamList, Screens>>()
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
    const sendNotificationToAdmins = async () => {
      if (!authToken) return
      const tokens = await getAdminTokens(authToken)
      await sendPushNotification({
        tokens,
        title: 'Nueva solicitud de recomendación de lugar',
        body: `${capitalize(user?.first_name)} ${capitalize(user?.last_name)} ha enviado una solicitud de recomendación de lugar y necesita aprobación.`,
      })
    }
    
    const handleSubmit = async (lugar: Lugar) => {
      setIsLoading(true)
      if (authToken) {
         const token_lugar=await new_lugar(authToken,lugar)
         const message: string= await newPlaceRequest(authToken,token_lugar)
         if(message === 'success'){
          setImg('verificacion_envio')
          setText("Su solicitud ha sido enviada con éxito, un administrador revisará y responderá a su solicitud dentro de los siguientes días. En la sección “Solicitudes” podrá ver el estado y respuesta a su solicitud.")
         }
      }
      dispatch(
        setLugarHasModified({
          lugarHasModified: !lugarHasModified,
        })
      )
      setIsLoading(false)
      await sendNotificationToAdmins()
      setDisplayMenu(true)

    }
    const handleCancel = () => {
        navigation.goBack()
    }
  
    return (
      <>
      <NotificationPopUp
        setVisible= {setDisplayMenu}
        visible= {displayMenu}
        imageName= {img}
        body={text}
        setConfirmation={() => navigation.navigate('Solicitudes')}
      />

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
    </>
    )
  }
  
  export default LugarFormularioTemplate
  