import * as React from 'react'
import BaseDrawerPaginas from '../components/templates/BasePaginasDrawer'
import LocalSeguroRegistro from '../components/templates/RegistroLocalSeguro/LocalSeguroRegistro'

const RegistroLocalSeguro = () => {
    return (
      <BaseDrawerPaginas backgroundColor="bg-white">
        <LocalSeguroRegistro />
      </BaseDrawerPaginas>
    )
  }
  
  export default RegistroLocalSeguro