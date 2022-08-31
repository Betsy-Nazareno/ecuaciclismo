import { RouteProp } from '@react-navigation/native'
import * as React from 'react'
import BasePaginasSecundarias from '../components/templates/BasePaginasSecundarias'
import ReporteFinalRuta from '../components/templates/RastreoRutas/ReporteFinalRuta'
import { RootStackParamList } from '../models/Screens.types'

interface FinalRutaProps {
  route: RouteProp<RootStackParamList, 'FinalRuta'>
}

const FinalRuta = ({ route }: FinalRutaProps) => {
  const { tokenRuta = '', tokenUsuario = '' } = route.params || {}
  return (
    <BasePaginasSecundarias>
      <ReporteFinalRuta tokenRuta={tokenRuta} tokenUsuario={tokenUsuario} />
    </BasePaginasSecundarias>
  )
}

export default FinalRuta
