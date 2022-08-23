import { RouteProp } from '@react-navigation/native'
import * as React from 'react'
import BasePaginasSecundarias from '../components/templates/BasePaginasSecundarias'
import PerfilForm from '../components/templates/FormularioPerfil/PerfilForm'
import { RootStackParamList } from '../models/Screens.types'

interface Props {
  route: RouteProp<RootStackParamList, 'PerfilFormulario'>
}

const PerfilFormulario = ({ route }: Props) => {
  return (
    <BasePaginasSecundarias>
      <PerfilForm datosPerfil={route?.params?.data} />
    </BasePaginasSecundarias>
  )
}

export default PerfilFormulario
