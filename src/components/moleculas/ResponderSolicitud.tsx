import * as React from 'react'
import tw from 'twrnc'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import ConfirmationModal from '../organismos/ConfirmationModal'
import { Solicitud } from '../../models/Solicitud'
import { responderSolicitud } from '../../lib/services/solicitud.services'
import { setSolicitudHasModified } from '../../redux/solicitud'
import { BACKGROUND_COLORS } from '../../utils/constants'
import UnfocusButton from '../atomos/UnfocusButton'
import SecondaryButton from '../atomos/SecondaryButton'
import { RootStackParamList, Screens } from '../../models/Screens.types'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { usePermissionsNotifications } from '../../hooks/usePermissionsNotifications'
import Spinner from '../atomos/Spinner'

interface ResponderSolicitudProps {
  solicitud: Solicitud
  setSolicitud: (solicitud: Solicitud | undefined) => void
}
const ResponderSolicitud= ({ solicitud ,setSolicitud}: ResponderSolicitudProps) => {
  const [showModal, setShowModal] = React.useState(false)
  const [showmodalCancelled, setShowModalCancelled] = React.useState(false)
  const [confirmationRefused, setConfirmationRefused] = React.useState(false)
  const [confirmationAttended, setConfirmationAttended] = React.useState(false)
  const { authToken } = useSelector((state: RootState) => state.user)
  const [motivo, setMotivo] = React.useState('')
  const [ isSubmitting, setIsSubmitting ] = React.useState<boolean>(false)
  const navigation = useNavigation<NavigationProp<RootStackParamList, Screens>>()
  const { solicitudHasModified } = useSelector(
    (state: RootState) => state.solicitud
  )
  const dispatch = useDispatch()
  const { sendPushNotification } = usePermissionsNotifications()

   
  React.useEffect(() => {
    ;(async () => {
      if (confirmationAttended) {
        setIsSubmitting(true)
        dispatch(
          setSolicitudHasModified({
            solicitudHasModified: !solicitudHasModified,
          })
        )
        if (solicitud.token && authToken) {
          await responderSolicitud(authToken, solicitud.token, 'Aprobada','',solicitud.tipo)
          setSolicitud({ ...solicitud, estado: 'Aprobada' });
          setShowModal(false)
          await sendNotificacionComentario()
          setIsSubmitting(false)
          setConfirmationAttended(false)
          navigation.navigate('Solicitudes')

        }
        
      }
    })()
  }, [confirmationAttended])
  React.useEffect(() => {
    ;(async () => {
      if (confirmationRefused) {
        setIsSubmitting(true)
        dispatch(
          setSolicitudHasModified({
            solicitudHasModified: !solicitudHasModified,
          })
        )
        if (solicitud.token && authToken) {

            await responderSolicitud(authToken, solicitud.token, 'Rechazada', motivo,solicitud.tipo)
            setSolicitud({ ...solicitud, estado: 'Cancelada' });
            setShowModalCancelled(false)
            await sendNotificacionComentario()
            setIsSubmitting(false)
            setConfirmationRefused(false)
            navigation.navigate('Solicitudes')

        }
        
      }
    })()
  }, [confirmationRefused])

  const handleApprove= () => {
    setShowModal(true)
  }

  const handleDecline = async () => {
    setShowModalCancelled(true)
  }
  const sendNotificacionComentario = async () => {
    if (!solicitud.token_usuario || !solicitud.token_notificacion) return
    await sendPushNotification({
      tokens: [solicitud.token_usuario],
      title: 'Solicitud revisada',
      body: `Un administrador ha revisado tu  ${solicitud.nombre}`,
    })
  }

  return (
    <>
      <ConfirmationModal
        setVisible={setShowModal}
        visible={showModal}
        labelId='confirmationAprobeForm'
        title={'Aprobar solicitud'}
        body="¿Estás seguro que deseas aprobar esta solicitud?"

        setConfirmation={setConfirmationAttended}
      />
      <ConfirmationModal
      labelId='rejectForm'
        setVisible={setShowModalCancelled}
        visible={showmodalCancelled}
        title={'Rechazar solicitud'}
        body="¿Estás seguro que deseas rechazar esta solicitud?"
        motivo={motivo}
        setMotivo={setMotivo}
        setConfirmation={setConfirmationRefused}
      />
          <View style={tw`flex flex-row justify-center my-6`}>
            {isSubmitting?(
                <Spinner />
            ):(
              <>
              <UnfocusButton
                label="Rechazar"
                handleClick={handleDecline}
                style={`${BACKGROUND_COLORS.GRAY} w-30 shadow-sm mr-4`}
              />
              {solicitud.estado != 'Aprobada' ? (
              <SecondaryButton
                label="Aprobar"
                handleClick={handleApprove}
                style={`${BACKGROUND_COLORS.ORANGE} w-40 shadow-sm `}
              />
            ):null}
              </>
            )}
    
          </View>
    </>
  )
}

export default ResponderSolicitud