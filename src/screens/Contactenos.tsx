import * as React from 'react'
import BaseDrawerPaginas from '../components/templates/BasePaginasDrawer'
import DatosContacto from '../components/templates/Contactenos/DatosContacto'

const Contactaenos = () => {
  return (
    <BaseDrawerPaginas backgroundColor="bg-white">
      <DatosContacto />
    </BaseDrawerPaginas>
  )
}

export default Contactaenos
