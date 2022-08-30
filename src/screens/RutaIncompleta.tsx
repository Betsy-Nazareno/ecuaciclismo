import { RouteProp } from '@react-navigation/native'
import * as React from 'react'
import BasePaginas from '../components/templates/BasePaginas'
import ReporteRutaIncompleta from '../components/templates/RastreoRutas/ReporteRutaIncompleta'
import { RootStackParamList } from '../models/Screens.types'

interface RutaIncompletaProps {
  route: RouteProp<RootStackParamList, 'RutaIncompleta'>
}

const RutaIncompleta = ({ route }: RutaIncompletaProps) => {
  const { tokenRuta = '', tokenUsuario = '' } = route.params || {}
  return (
    <BasePaginas>
      <ReporteRutaIncompleta
        tokenRuta={tokenRuta}
        tokenUsuario={tokenUsuario}
      />
    </BasePaginas>
  )
}

export default RutaIncompleta
