import * as React from 'react'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import TitleWithDivider from '../../moleculas/TitleWithDivider'
import MapViewSelectUbication from '../../moleculas/MapViewSelectUbication'
import { WIDTH_DIMENSIONS } from '../../../utils/constants'
import { RutaCoordinadas } from '../../../models/Rutas'

interface RutaMapViewProps {
  ubicacion: RutaCoordinadas
  negocios: any[] 
}

const RutaMapView = ({ ubicacion, negocios }: RutaMapViewProps) => {
  return (
    <RoundedWhiteBaseTemplate shadow={false}>
      <TitleWithDivider label="Ruta" />
      {ubicacion ? (
        <MapViewSelectUbication
          value={ubicacion}
          height={300}
          width={WIDTH_DIMENSIONS * 0.86}
          negocios={negocios} 
        />
      ) : null}
    </RoundedWhiteBaseTemplate>
  )
}

export default RutaMapView
