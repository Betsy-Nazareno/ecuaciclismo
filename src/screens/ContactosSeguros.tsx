
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
/*  

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BasePaginas from '../components/templates/BasePaginas'
import SecureContacts from '../components/templates/ContactosSeguros/SecureContacts'
import { setRutaHasModified } from '../redux/ruta'
import { RootState } from '../redux/store'

const ContactosSeguros = () => {
  return (
    <BasePaginas backgroundColor="bg-white">
      <SecureContacts />
    </BasePaginas>
  )
}

export default ContactosSeguros
*/