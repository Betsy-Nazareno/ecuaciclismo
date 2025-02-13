import * as React from 'react'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../models/Screens.types'
import BaseDrawerPaginas from '../components/templates/BasePaginasDrawer'
import RequisitosRegistroLocalSeguro from '../components/templates/RegistroLocalSeguro/RequisitosRegistroLocalSeguro'

interface RegistroLocalSeguroRequisitosProps {
  route: RouteProp<RootStackParamList, 'RegistroLocalSeguroFormulario'>
}

const RegistroLocalSeguroRequisitos = ({ route }: RegistroLocalSeguroRequisitosProps) => {
    return (
      <BaseDrawerPaginas backgroundColor="bg-white">
        <RequisitosRegistroLocalSeguro registerType = {route.params?.registerType as string}/>
      </BaseDrawerPaginas>
    )
  }
  
  export default RegistroLocalSeguroRequisitos