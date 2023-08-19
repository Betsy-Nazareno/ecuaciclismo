import { RouteProp } from '@react-navigation/native'
import * as React from 'react'
import BasePaginasSecundarias from '../components/templates/BasePaginasSecundarias'
import AlertaFormularioTemplate from '../components/templates/FormularioAlerta/AlertaFormularioTemplate'
import { RootStackParamList } from '../models/Screens.types'

interface Props {
  route: RouteProp<RootStackParamList, 'AlertaFormulario'>
}

const AlertaFormulario = ({ route }: Props) => {
  return (
    <BasePaginasSecundarias>
      <AlertaFormularioTemplate ubicacion={route.params?.data} />
    </BasePaginasSecundarias>
  )
}

export default AlertaFormulario
