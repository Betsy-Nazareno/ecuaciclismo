import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import 'react-native-get-random-values';
import { useDispatch, useSelector } from "react-redux";
import { usePermissionsNotifications } from "../../../hooks/usePermissionsNotifications";
import { agregarAlerta } from "../../../lib/services/alertas.services";
import { registrarLogAlerta } from "../../../lib/services/alertas.services";
import { setAlertaHasModified } from '../../../redux/alerta'
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
import { v4 as uuidv4 } from 'uuid';
import NotificationPopUp from "../../organismos/NotificationPopUp";


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


  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
  const { alertaHasModified } = useSelector(
    (state: RootState) => state.alerta
  )
  const { sendPushNotification } = usePermissionsNotifications()
  const dispatch = useDispatch()
  const [displayMenu, setDisplayMenu] = React.useState(false)
  const [img, setImg] = React.useState<string>('caution')
  const [text, setText] = React.useState<string>('Hubo un error, intentelo más tarde por favor.')
  const uuid = uuidv4();

  React.useEffect(() => {
    registrarLogAlerta(authToken!, "Ingresar Modulo de Alertas", "El usuario ha ingresado al modulo de alerta", uuid);
    setalertaProp(Prop)
  }, [])

  const temp = {
    coordinateX: {
      latitude: -2.1453200715782175,
      longitude: -79.89056378602983,
    },
    coordinateY: {
      latitude: -2.1453200715782175,
      longitude: -79.89056378602983,
    }
  }

  const initialValues = {
    descripcion: alertaProp?.descripcion || '',
    tipo: alertaProp?.tipo || '',
    colaboraciones: alertaProp?.colaboraciones || [],
    estado: alertaProp?.estado || 'En curso',
    multimedia: alertaProp?.multimedia || [],
    audios: alertaProp?.audios || [],
    ubicacion: ubicacion || temp,
    visibilidad: alertaProp?.visibilidad || [],
  }
  const handleSubmit = async (alerta: Alerta) => {
    setIsLoading(true)

    if (authToken) {

      const data = await agregarAlerta(alerta, authToken)
      const tokens = data?.data
      const status: string = data?.status
      const message: string = data?.message
      if (status === 'success') {
        await registrarLogAlerta(authToken!, "Alerta Creada", "El usuario ha creado la alerta", uuid);
        setImg('verificacion_envio')
        setText("Su Alerta se ha enviado con éxito")
      }else{
        await registrarLogAlerta(authToken!, "Alerta No Creada", message, uuid);
      }
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
    setDisplayMenu(true)
  }

  return (
    <>
      <NotificationPopUp
        setVisible={setDisplayMenu}
        visible={displayMenu}
        imageName={img}
        body={text}
        setConfirmation={() => navigation.navigate('Alertas')}
      />
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
    </>
  )
}

export default AlertaFormularioTemplate
