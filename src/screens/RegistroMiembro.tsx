import * as React from 'react'
import BaseDrawerPaginas from '../components/templates/BasePaginasDrawer'
import MemberRegister from '../components/templates/RegistroMiembro/MemberRegister'

const RegistroMiembro = () => {
    return (
      <BaseDrawerPaginas backgroundColor="bg-white">
        <MemberRegister />
      </BaseDrawerPaginas>
    )
  }
  
  export default RegistroMiembro