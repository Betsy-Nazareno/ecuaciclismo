
import * as React from 'react'
import BaseDrawerPaginas from '../components/templates/BasePaginasDrawer'
import ComunityContacts from '../components/templates/ContactosComunidad/ComunityContacts'

const ContactosComunidad = () => {
    return (
      <BaseDrawerPaginas backgroundColor="bg-white">
        <ComunityContacts />
      </BaseDrawerPaginas>
    )
  }
  
  export default ContactosComunidad
  