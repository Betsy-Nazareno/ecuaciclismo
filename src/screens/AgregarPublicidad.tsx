import { RouteProp } from '@react-navigation/native'
import * as React from 'react'
import { RootStackParamList } from '../../models/Screens.types'
import PublicidadFormulario from '../components/organismos/PublicidadFormulario'
import BasePaginasSecundarias from '../components/templates/BasePaginasSecundarias'

interface Props {
  route: RouteProp<RootStackParamList, 'AgregarPublicidad'>
}

const AgregarPublicidad = ({ route }: Props) => {
  return (
    <BasePaginasSecundarias>
      <PublicidadFormulario publicidadProp={route.params?.publicidad} />
    </BasePaginasSecundarias>
  )
}

export default AgregarPublicidad
