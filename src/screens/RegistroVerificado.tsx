import * as React from 'react'
import BaseDrawerPaginas from '../components/templates/BasePaginasDrawer'
import VerifiedRegister from '../components/templates/RegistroVerificado/VerifiedRegister'

const RegistroVerificado = () => {
    return (
      <BaseDrawerPaginas backgroundColor="bg-white">
        <VerifiedRegister />
      </BaseDrawerPaginas>
    )
  }
  
  export default RegistroVerificado