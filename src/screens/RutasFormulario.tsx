import { RouteProp } from '@react-navigation/native'
import * as React from 'react'
import BasePaginasSecundarias from '../components/templates/BasePaginasSecundarias'
import FormularioRutas from '../components/templates/FormularioRutas/FormularioRutas'
import { Ruta } from '../models/Rutas'
import { RootStackParamList } from '../models/Screens.types'

interface Props {
  route: RouteProp<RootStackParamList, 'RutasFormulario'>
}

const RutasFormulario = ({ route }: Props) => {
  return (
    <BasePaginasSecundarias>
      <FormularioRutas rutaProp={route.params?.ruta as Ruta} />
    </BasePaginasSecundarias>
  )
}

export default RutasFormulario
