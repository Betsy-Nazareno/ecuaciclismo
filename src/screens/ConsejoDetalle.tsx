import { RouteProp } from '@react-navigation/native'
import * as React from 'react'
import { Consejo } from '../../models/Consejo.model'
import { RootDrawerParamList } from '../../models/Screens.types'
import ConsejoDetalleTemplate from '../components/organismos/ConsejoDetalleTemplate'
import BaseDrawerPaginas from '../components/templates/BasePaginasDrawer'

interface ConsejoDetalleProps {
  route: RouteProp<RootDrawerParamList, 'ConsejoDetalle'>
}
const ConsejoDetalle = ({ route }: ConsejoDetalleProps) => {
  return (
    <BaseDrawerPaginas>
      <ConsejoDetalleTemplate consejo={route.params?.consejo as Consejo} />
    </BaseDrawerPaginas>
  )
}

export default ConsejoDetalle
