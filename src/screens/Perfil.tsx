import { RouteProp } from '@react-navigation/native'
import React from 'react'
import BasePaginas from '../components/templates/BasePaginas'
import PerfilRoot from '../components/templates/Perfil/PerfilRoot'
import { RootStackParamList } from '../models/Screens.types'

interface PerfilProps {
  route: RouteProp<RootStackParamList, 'Perfil'>
}

const Perfil = ({ route }: PerfilProps) => {
  return (
    <BasePaginas>
      <PerfilRoot userToken={route.params?.userToken as string} />
    </BasePaginas>
  )
}

export default Perfil
