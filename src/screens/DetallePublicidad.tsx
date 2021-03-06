import { RouteProp } from '@react-navigation/native'
import * as React from 'react'
import { PublicidadInterface } from '../../models/Publicidad.model'
import { RootStackParamList } from '../../models/Screens.types'
import PublicidadIndividual from '../components/organismos/PublicidadIndividual'
import BasePaginasSecundarias from '../components/templates/BasePaginasSecundarias'
interface DetallePublicidadProps {
  route: RouteProp<RootStackParamList, 'DetallePublicidad'>
}

const DetallePublicidad = ({ route }: DetallePublicidadProps) => {
  return (
    <BasePaginasSecundarias>
      <PublicidadIndividual data={route.params?.data as PublicidadInterface} />
    </BasePaginasSecundarias>
  )
}

export default DetallePublicidad
