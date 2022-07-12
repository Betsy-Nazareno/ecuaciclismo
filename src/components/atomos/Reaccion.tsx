import * as React from 'react'
import { Text, View, Image, ImageSourcePropType, Pressable } from 'react-native'
import tw from 'twrnc'
import { ReaccionTypes } from '../../../models/Reacciones.model'
import { BACKGROUND_COLORS, TEXT_COLORS } from '../../../utils/constants'

interface ReaccionProps {
  image: ImageSourcePropType
  dimension: number
  isSelected?: boolean
  name: ReaccionTypes
  isLoading: boolean
  handleClick: (value: ReaccionTypes) => void
  countReaction: number
}

const Reaccion = ({
  image,
  dimension,
  isSelected,
  name,
  handleClick,
  countReaction,
  isLoading,
}: ReaccionProps) => {
  return (
    <Pressable onPress={() => handleClick(name)} disabled={isLoading}>
      <View style={tw`mx-2 flex flex-row `}>
        <View style={tw`pr-2`}>
          <Image
            source={image}
            style={{ width: dimension, height: dimension }}
          />
          {isSelected && (
            <View
              style={tw`h-[3px] w-full mt-2 rounded-2xl ${BACKGROUND_COLORS.ORANGE}`}
            />
          )}
        </View>
        <Text style={tw`${TEXT_COLORS.DARK_GRAY} text-xs`}>
          {countReaction >= 1 ? countReaction : ''}
        </Text>
      </View>
    </Pressable>
  )
}

export default Reaccion
