import { RouteProp } from '@react-navigation/native'
import React from 'react'
import BasePaginasSecundarias from '../components/templates/BasePaginasSecundarias'
import AlertaDetalle from '../components/templates/DetalleAlerta/AlertaDetalle'
import { RootStackParamList } from '../models/Screens.types'

interface DetalleAlertaProps {
  route: RouteProp<RootStackParamList, 'DetalleAlerta'>
}

const DetalleAlerta= ({ route }: DetalleAlertaProps) => {
  return (
    <BasePaginasSecundarias>
      <AlertaDetalle token={route.params?.token as string} />
    </BasePaginasSecundarias>
  )
}

export default DetalleAlerta