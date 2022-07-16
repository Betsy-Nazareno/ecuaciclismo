import * as React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Etiqueta } from '../../models/Etiqueta.model'
import tw from 'twrnc'
import Badge from './Badge'
import Gap from '../atomos/Gap'
import { BACKGROUND_COLORS } from '../../utils/constants'

interface LinkedBadgesProps {
  badges: Etiqueta[]
}

const LinkedBadges = ({ badges }: LinkedBadgesProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={tw`mx-4 flex flex-row overflow-hidden`}
    >
      {badges.map((badge) => (
        <Gap key={badge.value} px="1">
          <Badge
            name={badge.value}
            label={badge.label}
            backgroundColor={BACKGROUND_COLORS.SKY_BLUE}
          />
        </Gap>
      ))}
    </ScrollView>
  )
}

export default LinkedBadges
