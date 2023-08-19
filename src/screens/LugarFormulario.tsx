import { RouteProp } from '@react-navigation/native'
import * as React from 'react'
import BasePaginasSecundarias from '../components/templates/BasePaginasSecundarias'
import LugarFormularioTemplate from '../components/templates/FormularioLugar/LugarFormularioTemplate'
import { RootStackParamList } from '../models/Screens.types'

interface Props {
  route: RouteProp<RootStackParamList, 'LugarFormulario'>
}

const LugarFormulario = ({ route }: Props) => {
  return (
    <BasePaginasSecundarias>
      <LugarFormularioTemplate longitud={route.params?.longitud} latitud={route.params?.latitud}/>
    </BasePaginasSecundarias>
  )
}

export default LugarFormulario