import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BasePaginas from '../components/templates/BasePaginas'
import RutasFeed from '../components/templates/Rutas/RutasFeed'
import { setRutaHasModified } from '../redux/ruta'
import { RootState } from '../redux/store'

const Rutas = () => {
  const dispatch = useDispatch()
  const { rutaHasModified } = useSelector((state: RootState) => state.ruta)

  const onRefresh = async () => {
    dispatch(setRutaHasModified({ rutaHasModified: !rutaHasModified }))
  }

  return (
    <BasePaginas backgroundColor="bg-white" handleRefresh={onRefresh}>
      <RutasFeed />
    </BasePaginas>
  )
}

export default Rutas
