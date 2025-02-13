import * as React from 'react'
import BaseDrawerPaginas from '../components/templates/BasePaginasDrawer'
import SeguridadDatos from '../components/templates/Seguridad/SeguridadDatos'


const Seguridad = () => {
    return (
      <BaseDrawerPaginas backgroundColor="bg-white">
        <SeguridadDatos />
      </BaseDrawerPaginas>
    )
  }
  
  export default Seguridad