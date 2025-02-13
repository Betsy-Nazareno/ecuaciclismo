import { RouteProp } from '@react-navigation/native'
import React from 'react'
import BasePaginasSecundarias from '../components/templates/BasePaginasSecundarias'
import { RootDrawerParamList } from '../models/Screens.types'
import SolicitudDetalle from '../components/templates/DetalleSolicitud/SolicitudDetalle'
import { Solicitud } from '../models/Solicitud'

interface DetalleSolicitudProps {
  route: RouteProp<RootDrawerParamList, 'DetalleSolicitud'>
}

const DetalleSolicitud= ({ route }: DetalleSolicitudProps) => {
  return (
    <BasePaginasSecundarias>
      <SolicitudDetalle solicitud={route.params?.solicitud as Solicitud} />
    </BasePaginasSecundarias>
  )
}

export default DetalleSolicitud