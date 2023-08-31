import * as React from 'react'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../models/Screens.types'
import BaseDrawerPaginas from '../components/templates/BasePaginasDrawer'
import MemberForm from '../components/templates/RegistroMiembro/MemberForm'
import { RegistroMiembro } from '../models/RegistroMiembro'

interface FormularioMiembroProps {
  route: RouteProp<RootStackParamList, 'FormularioMiembro'>
}

const FormularioMiembro = ({ route }: FormularioMiembroProps) => {
    return (
      <BaseDrawerPaginas backgroundColor="bg-white">
        {(route.params?.initValues)? (
          <MemberForm initValues = {route.params?.initValues as RegistroMiembro}/>
        ) : (
          <MemberForm/>
        )}
      </BaseDrawerPaginas>
    )
  }
  
  export default FormularioMiembro