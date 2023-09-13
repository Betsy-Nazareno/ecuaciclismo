import * as React from 'react'
import BaseDrawerPaginas from '../components/templates/BasePaginasDrawer'
import SelectUsers from '../components/templates/RegistroVerificado/SelectUsers'

const SeleccionarUsers = () => {
    return (
      <BaseDrawerPaginas backgroundColor="bg-white">
        <SelectUsers />
      </BaseDrawerPaginas>
    )
  }
  
  export default SeleccionarUsers