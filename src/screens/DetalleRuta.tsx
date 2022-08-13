import { RouteProp } from '@react-navigation/native'
import * as React from 'react'
import BasePaginasSecundarias from '../components/templates/BasePaginasSecundarias'
import RutaIndividual from '../components/templates/DetalleRutas/RutaIndividual'
import { RootStackParamList } from '../models/Screens.types'

interface DetallePublicacionProps {
  route: RouteProp<RootStackParamList, 'DetallePublicacion'>
}
const DetalleRuta = ({ route }: DetallePublicacionProps) => {
  return (
    <BasePaginasSecundarias>
      <RutaIndividual token={route.params?.token as string} />
    </BasePaginasSecundarias>
  )
}

export default DetalleRuta
