import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BasePaginas from '../components/templates/BasePaginas'
import AlertasFeed from '../components/templates/Alertas/AlertasFeed'
import { setAlertaHasModified } from '../redux/alerta'
import { RootState } from '../redux/store'

const Alertas = () => {
  const dispatch = useDispatch()
  const { alertaHasModified } = useSelector((state: RootState) => state.alerta)

  const onRefresh = async () => {
    dispatch(setAlertaHasModified({ alertaHasModified: !alertaHasModified }))
  }

  return (
    <BasePaginas backgroundColor="bg-white" handleRefresh={onRefresh}>
      <AlertasFeed />
    </BasePaginas>
  )
}

export default Alertas 