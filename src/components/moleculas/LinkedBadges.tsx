import * as React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Etiqueta } from '../../models/Etiqueta.model'
import tw from 'twrnc'
import Badge from './Badge'
import Gap from '../atomos/Gap'
import { BACKGROUND_COLORS } from '../../utils/constants'
import RoundedBadge from './RoundedBadge'

interface LinkedBadgesProps {
  etiquetas: Etiqueta[]
  tipo?: 'rounded' | 'standard'
  children?: React.ReactNode | React.ReactNode[]
}

const LinkedBadges = ({
  etiquetas,
  tipo = 'standard',
  children,
}: LinkedBadgesProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={tw`mx-4 flex flex-row overflow-hidden`}
    >
      {children}
      {etiquetas.map((etiqueta, index) => {
        return (
          <Gap key={index} px="1">
            {tipo === 'standard' ? (
              <Badge
                name={etiqueta.value}
                label={etiqueta.nombre}
                backgroundColor={BACKGROUND_COLORS.SKY_BLUE}
              />
            ) : tipo === 'rounded' ? (
              <RoundedBadge label={etiqueta.nombre} />
            ) : (
              <></>
            )}
          </Gap>
        )
      })}
    </ScrollView>
  )
}

export default LinkedBadges
