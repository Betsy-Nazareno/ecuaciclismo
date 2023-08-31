import * as React from 'react'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../models/Screens.types'
import BaseDrawerPaginas from '../components/templates/BasePaginasDrawer'
import FormularioRegistroLocalSeguro from '../components/templates/RegistroLocalSeguro/FormularioRegistroLocalSeguro'
import { RegistroLocalSeguro } from '../models/RegistroLocalSeguro'

interface RegistroLocalSeguroFormularioProps {
  route: RouteProp<RootStackParamList, 'RegistroLocalSeguroFormulario'>
}

const RegistroLocalSeguroFormulario = ({ route }: RegistroLocalSeguroFormularioProps) => {
    return (
      <BaseDrawerPaginas backgroundColor="bg-white">
        {(route.params?.initValues)? (
          <FormularioRegistroLocalSeguro
            registerType = {route.params?.registerType as string}
            initValues = {route.params?.initValues as RegistroLocalSeguro}
          />
        ) : (
          <FormularioRegistroLocalSeguro 
            registerType = {route.params?.registerType as string}
          />
        )}
      </BaseDrawerPaginas>
    )
  }
  
  export default RegistroLocalSeguroFormulario