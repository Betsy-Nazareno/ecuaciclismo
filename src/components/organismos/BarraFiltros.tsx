import * as React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import tw from 'twrnc'
import { Filtro } from '../../models/Publicaciones.model'
import { BACKGROUND_COLORS } from '../../utils/constants'
import Gap from '../atomos/Gap'
import Badge from '../moleculas/Badge'

interface BarraFiltrosProps {
  filtros: Filtro[]
}

const BarraFiltros = ({ filtros }: BarraFiltrosProps) => {
  return (
    <ScrollView
      horizontal
      style={tw`my-2 py-4 mx-4 flex flex-row overflow-hidden`}
    >
      {filtros.map((filtro) => {
        const { icon, value, label } = filtro
        return (
          <Gap key={filtro.value} px="1">
            <Badge
              label={label}
              name={value}
              icon={icon}
              backgroundColor={BACKGROUND_COLORS.ORANGE}
            />
          </Gap>
        )
      })}
    </ScrollView>
  )
}

export default BarraFiltros
