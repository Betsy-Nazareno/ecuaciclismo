import { RouteProp } from '@react-navigation/native'
import * as React from 'react'
import { NovedadInterface } from '../models/Novedad.model'
import { RootStackParamList } from '../models/Screens.types'
import BasePaginasSecundarias from '../components/templates/BasePaginasSecundarias'
import NovedadIndividual from '../components/templates/DetalleNovedades/NovedadIndividual'
interface DetalleNovedadProps {
  route: RouteProp<RootStackParamList, 'DetalleNovedad'>
}

const DetalleNovedad = ({ route }: DetalleNovedadProps) => {
  return (
    <BasePaginasSecundarias>
      <NovedadIndividual data={route.params?.data as NovedadInterface} />
    </BasePaginasSecundarias>
  )
}

export default DetalleNovedad
