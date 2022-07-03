import React from 'react'
import BasePaginas from '../components/templates/BasePaginas'
import Consejos from '../components/templates/Consejos'
import BannerPublicidad from '../components/organismos/BannerPublicidad'

const Inicio = () => {
  return (
    <BasePaginas stickyHeader>
      <BannerPublicidad />
      <Consejos />
    </BasePaginas>
  )
}

export default Inicio
