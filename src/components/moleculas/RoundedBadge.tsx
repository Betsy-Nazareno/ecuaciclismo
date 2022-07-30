import * as React from 'react'
import { Text, View } from 'react-native'
import tw from 'twrnc'
import { BORDER_COLORS, TEXT_COLORS } from '../../utils/constants'
interface RoundedBadgeProps {
  label: string
}

const RoundedBadge = ({ label }: RoundedBadgeProps) => {
  return (
    <View
      style={tw`bg-white rounded-3xl py-1 pl-2 pr-3 flex flex-row items-center h-7 border-2 border-solid ${BORDER_COLORS.DARK_BLUE}`}
    >
      <Text style={tw`${TEXT_COLORS.DARK_BLUE} text-xs font-semibold`}>
        {label}
      </Text>
    </View>
  )
}

export default RoundedBadge
