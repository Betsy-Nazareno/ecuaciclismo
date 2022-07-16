import * as React from 'react'
import { View } from 'react-native'
import tw from 'twrnc'
import { BACKGROUND_COLORS } from '../../utils/constants'
import { CustomText } from './CustomText'

interface BadgeProps {
  text: string
}

const Badge = ({ text }: BadgeProps) => {
  return (
    <View style={tw`${BACKGROUND_COLORS.ORANGE} rounded-3xl py-2 px-2`}>
      <CustomText style="text-white">{text}</CustomText>
    </View>
  )
}

export default Badge
