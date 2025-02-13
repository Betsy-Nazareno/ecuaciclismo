import * as React from 'react'
import BaseDrawerPaginas from '../components/templates/BasePaginasDrawer'
import HistorialBicicletasVisitor from '../components/templates/HistorialBicicletas/HistorialBicicletasVisitor'
import { RouteProp } from '@react-navigation/native'
import { RootDrawerParamList } from '../models/Screens.types'


interface BicicletasVisitorProps {
  route: RouteProp<RootDrawerParamList, 'BicicletasVisitor'>
}
const BicicletasVisitor = ({route}:BicicletasVisitorProps) => {
  
  return (
    <BaseDrawerPaginas>
      <HistorialBicicletasVisitor token_usuario={route.params?.token_usuario} />
    </BaseDrawerPaginas>
  )
}

export default BicicletasVisitor
