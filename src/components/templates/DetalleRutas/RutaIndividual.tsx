import * as React from 'react'
import tw from 'twrnc'
import { View } from 'react-native'
import RutaDetalleHeader, { ESTADO_RUTA } from './RutaDetalleHeader'
import RutaFotos from './RutaFotos'
import RutaMapView from './RutaMapView'
import RutaInformacion from './RutaInformacion'
import RutasRequisitos from './RutaRequisitos'
import ButtonPrimary from '../../atomos/ButtonPrimary'
import { BACKGROUND_COLORS } from '../../../utils/constants'
import RutasParticipantes from './RutasParticipantes'
import AdminValidator from '../AdminValidator'

const ubicacion = {
  coordinateX: {
    latitude: -2.1538019492930163,
    longitude: -79.88844282925129,
  },
  coordinateY: {
    latitude: -2.1453200715782175,
    longitude: -79.89056378602983,
  },
}

const getColorBadge = (estado: string) => {
  switch (estado) {
    case ESTADO_RUTA.CURSO:
    case ESTADO_RUTA.FINALIZADAS:
    case ESTADO_RUTA.NOCUPOS:
      return { background: BACKGROUND_COLORS.GRAY, label: 'Inscribirme' }
    case ESTADO_RUTA.DISPONIBLES:
      return {
        background: BACKGROUND_COLORS.PRIMARY_BLUE,
        label: 'Inscribirme',
      }
    case ESTADO_RUTA.INSCRITAS:
      return {
        background: BACKGROUND_COLORS.ORANGE,
        label: 'Cancelar inscripción',
      }
    default:
      return { background: BACKGROUND_COLORS.GRAY, label: 'Inscribirme' }
  }
}
const RutaIndividual = () => {
  let estado = 'Disponible'
  estado = 'Disponible'
  const bgColor = getColorBadge(estado)
  return (
    <View style={tw`px-2`}>
      <RutaDetalleHeader />
      <RutaInformacion />
      <RutaFotos />
      <RutaMapView ubicacion={ubicacion} />
      <RutasRequisitos />
      <AdminValidator>
        <RutasParticipantes />
      </AdminValidator>
      <ButtonPrimary
        label="Inscribirme"
        style={`${bgColor.background} w-11/12 py-2 mx-auto rounded-3xl my-4`}
      />
    </View>
  )
}

export default RutaIndividual
