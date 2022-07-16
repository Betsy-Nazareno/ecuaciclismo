import { RouteProp } from '@react-navigation/native'
import * as React from 'react'
import { RootStackParamList } from '../models/Screens.types'
import ConsejoForm from '../components/templates/ConsejoFormulario/ConsejoFormulario'
import BasePaginasSecundarias from '../components/templates/BasePaginasSecundarias'

interface Props {
  route: RouteProp<RootStackParamList, 'ConsejoFormulario'>
}

const ConsejoFormulario = ({ route }: Props) => {
  return (
    <BasePaginasSecundarias>
      <ConsejoForm consejoProp={route.params?.consejo} />
    </BasePaginasSecundarias>
  )
}

export default ConsejoFormulario
