import * as React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Etiqueta } from '../../models/Etiqueta.model'
import tw from 'twrnc'
import Badge from './Badge'
import Gap from '../atomos/Gap'
import { BACKGROUND_COLORS } from '../../utils/constants'

interface LinkedBadgesProps {
  etiquetas: Etiqueta[]
}

const LinkedBadges = ({ etiquetas }: LinkedBadgesProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={tw`mx-4 flex flex-row overflow-hidden`}
    >
      {etiquetas.map((etiqueta) => (
        <Gap key={etiqueta.value} px="1">
          <Badge
            name={etiqueta.value}
            label={etiqueta.nombre}
            backgroundColor={BACKGROUND_COLORS.SKY_BLUE}
          />
        </Gap>
      ))}
    </ScrollView>
  )
}

export default LinkedBadges
