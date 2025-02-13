
import * as React from 'react'
import BaseDrawerPaginas from '../components/templates/BasePaginasDrawer'
import SecureContacts from '../components/templates/ContactosSeguros/SecureContacts'

const ContactosSeguros = () => {
    return (
      <BaseDrawerPaginas backgroundColor="bg-white">
        <SecureContacts />
      </BaseDrawerPaginas>
    )
  }
  
  export default ContactosSeguros
  