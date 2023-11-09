import * as React from 'react'
import BaseDrawerPaginas from '../components/templates/BasePaginasDrawer'
import HistorialBicicletas from '../components/templates/HistorialBicicletas/HistorialBicicletas'

const Bicicletas = () => {
  return (
    <BaseDrawerPaginas>
      <HistorialBicicletas />
    </BaseDrawerPaginas>
  )
}

export default Bicicletas
