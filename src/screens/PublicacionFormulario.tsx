import { RouteProp } from '@react-navigation/native'
import * as React from 'react'
import BasePaginasSecundarias from '../components/templates/BasePaginasSecundarias'
import PublicacionFormularioTemplate from '../components/templates/FormularioPublicacion/PublicacionFormularioTemplate'
import { RootStackParamList } from '../models/Screens.types'

interface Props {
  route: RouteProp<RootStackParamList, 'PublicacionFormulario'>
}

const PublicacionFormulario = ({ route }: Props) => {
  return (
    <BasePaginasSecundarias>
      <PublicacionFormularioTemplate publicacionProp={route.params?.data} />
    </BasePaginasSecundarias>
  )
}

export default PublicacionFormulario
