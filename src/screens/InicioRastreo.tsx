import { RouteProp } from '@react-navigation/native'
import * as React from 'react'
import BasePaginasSecundarias from '../components/templates/BasePaginasSecundarias'
import RastreoMain from '../components/templates/RastreoRutas/RastreoMain'
import { Ruta } from '../models/Rutas'
import { RootStackParamList } from '../models/Screens.types'

interface InicioRastreoProps {
  route: RouteProp<RootStackParamList, 'InicioRastreo'>
}

const InicioRastreo = ({ route }: InicioRastreoProps) => {
  return (
    <BasePaginasSecundarias>
      <RastreoMain ruta={route.params?.ruta as Ruta} />
    </BasePaginasSecundarias>
  )
}

export default InicioRastreo
