import * as React from 'react'
import BaseDrawerPaginas from '../components/templates/BasePaginasDrawer'
import SolicitudesFeed from '../components/templates/Solicitudes/SolicitudesFeed'

const Solicitudes = () => {
  return (
    <BaseDrawerPaginas>
      <SolicitudesFeed />
    </BaseDrawerPaginas>
  )
}

export default Solicitudes