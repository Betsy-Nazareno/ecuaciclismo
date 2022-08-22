import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BasePaginas from '../components/templates/BasePaginas'
import PublicacionesFeed from '../components/templates/Publicaciones/PublicacionesFeed'
import { setPublicacionHasModified } from '../redux/publicacion'
import { RootState } from '../redux/store'

const Publicaciones = () => {
  const dispatch = useDispatch()
  const { publicacionHasModified } = useSelector(
    (state: RootState) => state.publicacion
  )

  const onRefresh = async () => {
    dispatch(
      setPublicacionHasModified({
        publicacionHasModified: !publicacionHasModified,
      })
    )
  }

  return (
    <BasePaginas handleRefresh={onRefresh}>
      <PublicacionesFeed />
    </BasePaginas>
  )
}

export default Publicaciones
