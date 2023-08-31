import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePermissionsNotifications } from "../../../hooks/usePermissionsNotifications";
import { agregarAlerta} from "../../../lib/services/alertas.services";
import  { setAlertaHasModified } from '../../../redux/alerta'
import { Alerta } from "../../../models/Alertas";
import { RootStackParamList, Screens } from "../../../models/Screens.types";
import { RootState } from "../../../redux/store";
import { capitalize } from '../../../utils/capitalizeText'
import { AlertaValidationSchema } from "../../../schemas/AlertaSchema";
import AlertaContenidoFormulario from "./AlertaContenidoFormulario";
import HeaderScreen from "../../moleculas/HeaderScreen";
import { ScrollView } from "react-native-gesture-handler";
import { Formik } from "formik";
import tw from 'twrnc'
import { RutaCoordinadas } from "../../../models/Alertas";
import * as Location from 'expo-location';


interface AlertaFormularioProps {
    Prop?: Alerta
    ubicacion?: RutaCoordinadas
  }

  const AlertaFormularioTemplate = ({
    Prop,
    ubicacion,
  }: AlertaFormularioProps) => {
    const { authToken, user } = useSelector((state: RootState) => state.user)
    const [isLoading, setIsLoading] = React.useState(false)
    const [alertaProp, setalertaProp] = React.useState<Alerta>()
    const [location, setLocation] =React.useState<RutaCoordinadas>()
    
    const navigation =
      useNavigation<NavigationProp<RootStackParamList, Screens>>()
    const { alertaHasModified } = useSelector(
      (state: RootState) => state.alerta
    )
    const { sendPushNotification } = usePermissionsNotifications()
    const dispatch = useDispatch()
  
    React.useEffect(() => {
      setalertaProp(Prop)
      getLocationAsync();
    }, [])

    //obtener ubicacion
    const getLocationAsync = async () => {
      try {
        if(ubicacion){
          setLocation(ubicacion)
          return;
        }
        if(alertaProp?.ubicacion){
          setLocation(alertaProp?.ubicacion)
          return;
        }
        const { status } = await Location.requestForegroundPermissionsAsync();
    
        if (status !== 'granted') {
          const temp={
            coordinateX: {
              latitude:-2.1538019492930163,
              longitude: -79.88844282925129,
            },
            coordinateY: {
              latitude: -2.1453200715782175,
              longitude: -79.89056378602983,
            }
          }
          setLocation(temp);
          return { errorMsg: 'Permiso de ubicación denegado', coordinates: null };
        }
    
        const locationTemp = await Location.getCurrentPositionAsync({});
        const temp={
          coordinateX: {
            latitude: locationTemp.coords.latitude,
            longitude: locationTemp.coords.longitude,
          },
          coordinateY: {
            latitude: -2.1453200715782175,
            longitude: -79.89056378602983,
          }
        }
        setLocation(temp);
        
      } catch (error) {
        console.log(error);

      }
    }
    const initialValues = {
      descripcion: alertaProp?.descripcion || '',
      tipo: alertaProp?.tipo || '',
      colaboraciones: alertaProp?.colaboraciones || [],
      estado: alertaProp?.estado || 'En curso',
      multimedia: alertaProp?.multimedia || [],
      audios: alertaProp?.audios || [],
      ubicacion: location,
      visibilidad:alertaProp?.visibilidad || [],
      
    }

    const handleSubmit = async (alerta: Alerta) => {
      setIsLoading(true)

      if (authToken) {
        const tokens= await agregarAlerta(alerta, authToken)
        console.log(tokens)
        await sendPushNotification({
          tokens,
          title: 'Nueva Alerta',
          body: `${capitalize(
            user?.first_name
          )} te ha enviado una alerta. ¡Ven a revisarlo!`,
        })
      }
      dispatch(
        setAlertaHasModified({
          alertaHasModified: !alertaHasModified,
        })
      )
      setIsLoading(false)
      navigation.navigate('Alertas')
    }
  
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={tw`px-2 mb-8`}>
        <HeaderScreen
          title="Crear Alerta"
          message="¡Envia una alerta a la comunidad!"
          srcImage={require('../../../../assets/alertaBanner.png')}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={AlertaValidationSchema}
          onSubmit={handleSubmit}
        >
          <AlertaContenidoFormulario
            isSubmiting={isLoading} 
          />
        </Formik>
      </ScrollView>
    )
  }
  
  export default AlertaFormularioTemplate
  