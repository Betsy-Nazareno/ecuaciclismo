import { RouteProp } from '@react-navigation/native'
import * as React from 'react'
import { RootStackParamList } from '../models/Screens.types'
import PublicidadFormulario from '../components/templates/NovedadFormulario/NovedadFormulario'
import BasePaginasSecundarias from '../components/templates/BasePaginasSecundarias'

interface Props {
  route: RouteProp<RootStackParamList, 'NovedadFormulario'>
}

const NovedadFormulario = ({ route }: Props) => {
  return (
    <BasePaginasSecundarias>
      <PublicidadFormulario publicidadProp={route.params?.publicidad} />
    </BasePaginasSecundarias>
  )
}

export default NovedadFormulario
