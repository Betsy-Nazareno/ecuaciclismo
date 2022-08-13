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
  const { authToken } = useSelector((state: RootState) => state.user)
  const [isLoading, setIsLoading] = React.useState(false)
  const [ruta, setRuta] = React.useState<Ruta>()
  const [showModal, setShowModal] = React.useState(false)
  const [colaboraciones, setColaboraciones] = React.useState<string[]>([])
  const { rutaHasModified } = useSelector((state: RootState) => state.ruta)
  const dispatch = useDispatch()
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
  const estado = getEstadoRuta(ruta?.estado || { prioridad: 5 })
  const propsByState = getInformacionPorEstado(estado, ruta?.inscrito || false)
  const statesNoAllowed: EstadoRuta[] = [
    'En Curso',
    'Cancelada',
    'Finalizada',
    'Sin Cupos',
  ]

  React.useEffect(() => {
    ;(async () => {
      if (authToken && token) {
        setRuta(await getRutaById(authToken, token))
      }
    })()
  }, [rutaHasModified])

  const handleAprobar = async () => {
    setIsLoading(true)
    if (authToken) {
      await aprobarRuta(authToken, token)
      dispatch(setRutaHasModified({ rutaHasModified: !rutaHasModified }))
      navigation.navigate('Rutas')
    }
    setIsLoading(false)
  }

  const handleRechazar = async () => {
    setIsLoading(true)
    if (authToken) {
      await eliminarRuta(authToken, token)
      dispatch(setRutaHasModified({ rutaHasModified: !rutaHasModified }))
      navigation.navigate('Rutas')
    }
    setIsLoading(false)
  }

  const sendRegistro = async () => {
    setIsLoading(true)
    if (authToken) {
      if (!ruta?.inscrito) await inscribirUsuarioEnRuta(authToken, token)
      else await cancelarInscripcionUsuario(authToken, token)
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
    <View></View>
  ) : (
    <View style={tw`px-2 mb-4`}>
      {showModal && (
        <RutaColaboracionesModal
          colaboraciones={ruta.colaboraciones as any}
          visible={showModal}
          setVisible={setShowModal}
          handleAdd={handleAddColaboraciones}
          inscribirUser={sendRegistro}
        />
      )}
      <RutaDetalleHeader
        nombre={ruta?.nombre}
        tiposRuta={ruta?.tipoRuta}
        estado={estado}
        aprobada={ruta.aprobado || false}
      />
      <RutaInformacion
        fecha={ruta?.fecha_inicio as Date}
        lugar={ruta.lugar}
        cupos={ruta.cupos_disponibles || 0}
        registrados={ruta.participantes?.length || 0}
      />
      <RutaFotos fotos={ruta.fotos} />
      <RutaMapView ubicacion={ruta.ubicacion} />
      <RutasRequisitos requisitos={ruta.requisitos} />
      <RutasParticipantes participantes={ruta.participantes || []} />
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
