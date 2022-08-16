import * as React from 'react'
import tw from 'twrnc'
import { View } from 'react-native'
import { BACKGROUND_COLORS, TEXT_COLORS } from '../../utils/constants'
import { CustomText } from '../atomos/CustomText'

interface TitleWithDividerProps {
  label: string
}

const TitleWithDivider = ({ label }: TitleWithDividerProps) => {
  return (
    <View style={tw`flex flex-row items-center overflow-hidden`}>
      <CustomText style={`${TEXT_COLORS.DARK_BLUE} text-lg`}>
        {label}
      </CustomText>
      <View style={tw`${BACKGROUND_COLORS.GRAY} ml-2 h-[1px] w-full`} />
    </View>
  )
}

export default TitleWithDivider
