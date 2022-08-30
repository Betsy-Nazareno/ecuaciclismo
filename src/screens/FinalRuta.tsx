import { RouteProp } from '@react-navigation/native'
import * as React from 'react'
import BasePaginas from '../components/templates/BasePaginas'
import ReporteFinalRuta from '../components/templates/RastreoRutas/ReporteFinalRuta'
import { RootStackParamList } from '../models/Screens.types'

interface FinalRutaProps {
  route: RouteProp<RootStackParamList, 'FinalRuta'>
}

const FinalRuta = ({ route }: FinalRutaProps) => {
  const { tokenRuta = '', tokenUsuario = '' } = route.params || {}
  return (
    <BasePaginas>
      <ReporteFinalRuta tokenRuta={tokenRuta} tokenUsuario={tokenUsuario} />
    </BasePaginas>
  )
}

export default FinalRuta
