import { RouteProp } from '@react-navigation/native'
import React from 'react'
import BasePaginas from '../components/templates/BasePaginas'
import PerfilRoot from '../components/templates/Perfil/PerfilRoot'
import { RootDrawerParamList } from '../models/Screens.types'
import { useDispatch, useSelector } from 'react-redux'
import { actualizarUsuario } from '../redux/user'
import { RootState } from '../redux/store'
interface PerfilProps {
  route: RouteProp<RootDrawerParamList, 'Perfil'>
}

const Perfil = ({ route }: PerfilProps) => {
  const dispatch = useDispatch()
  const { refreshUser } = useSelector((state: RootState) => state.user)
  const onRefresh = async () => {
    dispatch(actualizarUsuario({ refreshUser: !refreshUser}))
  }
  return (
    <BasePaginas  handleRefresh={onRefresh}>
      <PerfilRoot userToken={route.params?.userToken as string} />
    </BasePaginas>
  )
}

export default Perfil
