import { RouteProp } from '@react-navigation/native'
import * as React from 'react'
import BasePaginas from '../components/templates/BasePaginas'
import ReporteRutaIncompleta from '../components/templates/RastreoRutas/ReporteRutaIncompleta'
import { RootStackParamList } from '../models/Screens.types'

interface RutaIncompletaProps {
  route: RouteProp<RootStackParamList, 'RutaIncompleta'>
}

const RutaIncompleta = ({ route }: RutaIncompletaProps) => {
  return (
    <BasePaginas>
      <ReporteRutaIncompleta tokenRuta={route.params?.tokenRuta as string} />
    </BasePaginas>
  )
}

export default RutaIncompleta
