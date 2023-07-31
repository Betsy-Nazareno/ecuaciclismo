
import * as React from 'react'
import BaseDrawerPaginas from '../components/templates/BasePaginasDrawer'
import PhoneContacts from '../components/templates/ContactosCelular/PhoneContacts'

const ContactosCelular = () => {
    return (
      <BaseDrawerPaginas backgroundColor="bg-white">
        <PhoneContacts />
      </BaseDrawerPaginas>
    )
  }
  
  export default ContactosCelular
  