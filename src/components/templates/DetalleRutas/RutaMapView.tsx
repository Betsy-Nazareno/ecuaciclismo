import * as React from 'react'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import TitleWithDivider from '../../moleculas/TitleWithDivider'
import MapViewSelectUbication from '../../moleculas/MapViewSelectUbication'
import { WIDTH_DIMENSIONS } from '../../../utils/constants'
import { Ruta } from '../../../models/Rutas'

interface RutaMapViewProps {
  ubicacion: Ruta
}

const RutaMapView = ({ ubicacion }: RutaMapViewProps) => {
  return (
    <RoundedWhiteBaseTemplate shadow={false}>
      <TitleWithDivider label="Ruta" />
      <MapViewSelectUbication
        value={ubicacion}
        height={300}
        width={WIDTH_DIMENSIONS * 0.86}
      />
    </RoundedWhiteBaseTemplate>
  )
}

export default RutaMapView
