import { RouteProp } from '@react-navigation/native'
import React from 'react'
import BasePaginasSecundarias from '../components/templates/BasePaginasSecundarias'
import Publicacion from '../components/templates/DetallePublicacion/Publicacion'
import { RootStackParamList } from '../models/Screens.types'

interface DetallePublicacionProps {
  route: RouteProp<RootStackParamList, 'DetallePublicacion'>
}

const DetallePublicacion = ({ route }: DetallePublicacionProps) => {
  return (
    <BasePaginasSecundarias>
      <Publicacion token={route.params?.token as string} />
    </BasePaginasSecundarias>
  )
}

export default DetallePublicacion
