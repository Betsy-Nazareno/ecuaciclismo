import * as React from 'react'
import { Text, View } from 'react-native'
import tw from 'twrnc'
import { BACKGROUND_COLORS, TEXT_COLORS } from '../../../utils/constants'

interface SectionTitleProps {
  text: string
  hasUpdates?: boolean
}

const SectionTitle = ({ text, hasUpdates }: SectionTitleProps) => {
  return (
    <View style={tw`flex flex-row relative ${BACKGROUND_COLORS.BLUE_LIGHTER}`}>
      <View style={tw`h-full w-[2px] bg-blue-500`} />
      <Text style={tw`ml-2 text-2xl font-bold ${TEXT_COLORS.DARK_BLUE}`}>
        {text}
      </Text>
      {hasUpdates && (
        <View
          style={tw` ml-2 mt-[2%] rounded-full h-2 w-2 ${BACKGROUND_COLORS.ORANGE}`}
        />
      )}
    </View>
  )
}

export default SectionTitle
