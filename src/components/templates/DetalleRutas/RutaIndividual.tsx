import * as React from 'react'
import tw from 'twrnc'
import { Text, View } from 'react-native'
import RutaDetalleHeader, { ESTADO_RUTA } from './RutaDetalleHeader'
import RutaFotos from './RutaFotos'
import RutaMapView from './RutaMapView'
import RutaInformacion from './RutaInformacion'
import RutasRequisitos from './RutaRequisitos'
import ButtonPrimary from '../../atomos/ButtonPrimary'
import { BACKGROUND_COLORS } from '../../../utils/constants'
import RutasParticipantes from './RutasParticipantes'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { EstadoRuta, Ruta } from '../../../models/Rutas'
import {
  aprobarRuta,
  cancelarInscripcionUsuario,
  eliminarRuta,
  getRutaById,
  inscribirUsuarioEnRuta,
} from '../../../lib/services/rutas.services'
import { getEstadoRuta } from '../../../utils/parseRouteState'
import Spinner from '../../atomos/Spinner'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import { setRutaHasModified } from '../../../redux/ruta'
import RutaColaboracionesModal from '../../organismos/RutaColaboracionesModal'
import MenuRutas from '../../moleculas/MenuRutas'
import RutaDescripcion from './RutaDescripcion'
import RutaPuntosEncuentro from './RutaPuntosEncuentro'
import { usePermissionsNotifications } from '../../../hooks/usePermissionsNotifications'
import EmptyDetalleRuta from '../../organismos/EmptyDetalleRuta'
import AdminValidator from '../AdminValidator'
import RutaComentarios from './RutaComentarios'

const getInformacionPorEstado = (estado: string, inscrito: boolean) => {
  if (inscrito) {
    return {
      background: BACKGROUND_COLORS.ORANGE,
      label: 'Cancelar Inscripción',
      message: '',
    }
  }
  switch (estado) {
    case ESTADO_RUTA.CURSO:
      return {
        background: 'bg-black bg-opacity-20',
        label: 'Inscribirme',
        message: 'La ruta ya ha iniciado, no puede registrarse',
      }
    case ESTADO_RUTA.FINALIZADAS:
      return {
        background: 'bg-black bg-opacity-20',
        label: 'Inscribirme',
        message: 'La ruta ha finalizado, no puede registrarse',
      }
    case ESTADO_RUTA.NOCUPOS:
      return {
        background: 'bg-black bg-opacity-20',
        label: 'Inscribirme',
        message: 'No hay cupos disponibles para esta ruta',
      }
    case ESTADO_RUTA.DISPONIBLES:
      return {
        background: BACKGROUND_COLORS.PRIMARY_BLUE,
        label: 'Inscribirme',
        message: '',
      }
    case ESTADO_RUTA.INSCRITAS:
      return {
        background: BACKGROUND_COLORS.ORANGE,
        label: 'Cancelar inscripción',
        message: '',
      }
    default:
      return {
        background: BACKGROUND_COLORS.GRAY,
        label: 'Inscribirme',
        message: '',
      }
  }
}

interface RutaIndividualProps {
  token: string
}

const RutaIndividual = ({ token }: RutaIndividualProps) => {
  const { authToken, user } = useSelector((state: RootState) => state.user)
  const [isLoading, setIsLoading] = React.useState(false)
  const [ruta, setRuta] = React.useState<Ruta>()
  const [showModal, setShowModal] = React.useState(false)
  const [refresh, setRefresh] = React.useState(false)
  const [colaboraciones, setColaboraciones] = React.useState<string[]>([])
  const { rutaHasModified } = useSelector((state: RootState) => state.ruta)
  const dispatch = useDispatch()
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
  const estado = getEstadoRuta(ruta?.estado || { prioridad: 5 })
  const propsByState = getInformacionPorEstado(estado, ruta?.inscrito || false)
  const { sendPushNotification } = usePermissionsNotifications()
  const statesNoAllowed: EstadoRuta[] = [
    'En Curso',
    'Cancelada',
    'Finalizada',
    'Cancelada',
  ]

  React.useEffect(() => {
    ;(async () => {
      if (authToken && token) {
        setRuta(await getRutaById(authToken, token))
      }
    })()
  }, [rutaHasModified, refresh])

  const sendNotificationRutaAprobada = async () => {
    if (!authToken || !ruta?.token_notificacion) return
    await sendPushNotification({
      tokens: [ruta?.token_notificacion],
      title: 'Tu ruta ha sido aprobada',
      body: `${user?.first_name} ${user?.last_name} ha aprobado la ruta que propusiste para la comunidad.`,
    })
  }

  const sendNotificationRutaRechazada = async () => {
    if (!authToken || !ruta?.token_notificacion) return
    await sendPushNotification({
      tokens: [ruta?.token_notificacion],
      title: 'Tu ruta ha sido rechazada',
      body: `${user?.first_name} ${user?.last_name} ha rechazado la solicitudd de la ruta ${ruta?.nombre}`,
    })
  }

  const handleAprobar = async () => {
    setIsLoading(true)
    if (authToken) {
      await aprobarRuta(authToken, token)
      dispatch(setRutaHasModified({ rutaHasModified: !rutaHasModified }))
      await sendNotificationRutaAprobada()
      navigation.navigate('Rutas')
    }
    setIsLoading(false)
  }

  const handleRechazar = async () => {
    setIsLoading(true)
    if (authToken) {
      await eliminarRuta(authToken, token)
      dispatch(setRutaHasModified({ rutaHasModified: !rutaHasModified }))
      await sendNotificationRutaRechazada()
      navigation.navigate('Rutas')
    }
    setIsLoading(false)
  }

  const sendRegistro = async () => {
    setIsLoading(true)
    if (authToken) {
      if (!ruta?.inscrito && estado !== 'Sin Cupos') {
        await inscribirUsuarioEnRuta(authToken, token, colaboraciones)
      } else {
        await cancelarInscripcionUsuario(authToken, token)
      }
    }
    dispatch(setRutaHasModified({ rutaHasModified: !rutaHasModified }))
    setIsLoading(false)
  }

  const handleRegistro = async () => {
    if (statesNoAllowed.includes(estado)) return
    if (
      ruta?.colaboraciones &&
      ruta?.colaboraciones.length > 0 &&
      !ruta?.inscrito
    ) {
      setShowModal(true)
      return
    }
    await sendRegistro()
  }

  const handleAddColaboraciones = (token: string) => {
    if (!colaboraciones.includes(token)) {
      setColaboraciones([...colaboraciones, token])
    } else {
      setColaboraciones(colaboraciones.filter((c) => c !== token))
    }
  }


  return !ruta ? (
    <EmptyDetalleRuta />
  ) : (
    <View style={tw`px-2 mb-4`}>
      {showModal ? (
        <RutaColaboracionesModal
          colaboraciones={ruta.colaboracionesValues as any}
          visible={showModal}
          setVisible={setShowModal}
          handleAdd={handleAddColaboraciones}
          inscribirUser={sendRegistro}
        />
      ) : null}
      <View style={tw`relative`}>
        <RutaDetalleHeader ruta={ruta} estado={estado} />
        <View style={tw`absolute right-4 top-8`}>
          <MenuRutas ruta={ruta} onRefresh={() => setRefresh(!refresh)} />
        </View>
      </View>
      <RutaInformacion
        fecha={ruta?.fecha_inicio as Date}
        lugar={ruta.lugar}
        cupos={ruta.cupos_disponibles || 0}
        registrados={ruta.participantes?.length || 0}
      />
      <RutaDescripcion descripcion={ruta?.descripcion} />
      <RutaFotos fotos={ruta.fotos} />
      <RutaMapView ubicacion={ruta.ubicacion} />
      {ruta.grupos_encuentro && ruta.grupos_encuentro.length > 0 ? (
        <RutaPuntosEncuentro grupos={ruta.grupos_encuentro || []} />
      ) : null}
      {ruta.requisitosValues && ruta.requisitosValues?.length > 0 ? (
        <RutasRequisitos requisitos={ruta.requisitosValues} />
      ) : null}
      <RutasParticipantes participantes={ruta.participantes || []} />

      <AdminValidator>
        <RutaComentarios participantes={ruta.participantes || []} />
      </AdminValidator>
      {ruta.aprobado ? (
        isLoading ? (
          <Spinner />
        ) : (
          <>
            <ButtonPrimary
              label={propsByState.label}
              style={`${propsByState.background} w-11/12 py-2 mx-auto rounded-3xl my-4`}
              handleClick={handleRegistro}
            />
            <Text style={tw`text-red-800 text-xs text-center`}>
              {propsByState.message}
            </Text>
          </>
        )
      ) : isLoading ? (
        <Spinner />
      ) : (
        <View style={tw`flex flex-row justify-center items-center`}>
          <ButtonPrimary
            label="Rechazar"
            style={`${BACKGROUND_COLORS.ORANGE} bg-opacity-80 mx-2 my-4 py-2 px-8 rounded-3xl`}
            icon={require('../../../../assets/close.png')}
            handleClick={handleRechazar}
            iconDimension={18}
          />
          <ButtonPrimary
            label="Aprobar"
            style={`${BACKGROUND_COLORS.PRIMARY_BLUE} mx-2 my-4 py-2 px-8 rounded-3xl`}
            handleClick={handleAprobar}
            icon={require('../../../../assets/check_white_icon.png')}
            iconDimension={18}
          />
        </View>
      )}
    </View>
  )
}

export default RutaIndividual
