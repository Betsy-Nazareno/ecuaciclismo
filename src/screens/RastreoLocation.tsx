import { RouteProp } from '@react-navigation/native'
import * as React from 'react'
import BasePaginasSecundarias from '../components/templates/BasePaginasSecundarias'
import RastreoUbicacion from '../components/templates/RastreoRutas/RastreoUbicacion'
import { Ruta } from '../models/Rutas'
import { RootStackParamList } from '../models/Screens.types'

interface RastreoLocationProps {
  route: RouteProp<RootStackParamList, 'RastreoUbicacion'>
}

const RastreoLocation = ({ route }: RastreoLocationProps) => {
  return (
    <BasePaginasSecundarias>
      <RastreoUbicacion ruta={route.params?.ruta as Ruta} />
    </BasePaginasSecundarias>
  )
}

export default RastreoLocation
