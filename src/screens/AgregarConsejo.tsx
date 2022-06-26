import { RouteProp } from '@react-navigation/native'
import * as React from 'react'
import { RootStackParamList } from '../../models/Screens.types'
import ConsejoFormulario from '../components/organismos/ConsejoFormulario'
import BasePaginasSecundarias from '../components/templates/BasePaginasSecundarias'

interface Props {
  route: RouteProp<RootStackParamList, 'AgregarConsejo'>
}

const AgregarConsejo = ({ route }: Props) => {
  return (
    <BasePaginasSecundarias>
      <ConsejoFormulario consejoProp={route.params?.consejo} />
    </BasePaginasSecundarias>
  )
}

export default AgregarConsejo
