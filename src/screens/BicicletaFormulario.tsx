import { RouteProp } from '@react-navigation/native'
import * as React from 'react'
import BasePaginasSecundarias from '../components/templates/BasePaginasSecundarias'
import { RootStackParamList } from '../models/Screens.types'
import BicicletasFormulario from '../components/templates/HistorialBicicletas/BicicletasFormulario'

interface Props {
    route: RouteProp<RootStackParamList, 'BicicletaFormulario'>
}

const BicicletaFormulario = ({ route }: Props) => {
    const { tokenUsuario = '' } = route.params || {}
    return (
        <BasePaginasSecundarias>
            <BicicletasFormulario tokenUsuario={tokenUsuario} />
        </BasePaginasSecundarias>
    )
}

export default BicicletaFormulario
