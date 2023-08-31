import * as React from 'react'
import BaseDrawerPaginas from '../components/templates/BasePaginasDrawer'
import MemberDownloadPage from '../components/templates/RegistroMiembro/MemberDownloadPage'

const DescargarSubirPDF = () => {
    return (
      <BaseDrawerPaginas backgroundColor="bg-white">
        <MemberDownloadPage />
      </BaseDrawerPaginas>
    )
  }
  
  export default DescargarSubirPDF