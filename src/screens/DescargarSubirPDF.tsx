import * as React from 'react'
import BaseDrawerPaginas from '../components/templates/BasePaginasDrawer'
import DescargarPDF from '../components/templates/RegistroLocalSeguro/DescargarPDF'

const DescargarSubirPDF = () => {
    return (
      <BaseDrawerPaginas backgroundColor="bg-white">
        <DescargarPDF />
      </BaseDrawerPaginas>
    )
  }
  
  export default DescargarSubirPDF