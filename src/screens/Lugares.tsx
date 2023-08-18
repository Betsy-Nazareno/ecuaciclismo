import * as React from 'react'
import BaseDrawerPaginas from '../components/templates/BasePaginasDrawer'
import MapaLugares from '../components/templates/Lugares/MapaLugares'

const Lugares = () => {
    return (
      <BaseDrawerPaginas backgroundColor="bg-white">
        <MapaLugares />
      </BaseDrawerPaginas>
    )
  }
  
  export default Lugares