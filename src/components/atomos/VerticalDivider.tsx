import * as React from 'react'
import { View } from 'react-native'
import tw from 'twrnc'
import { BACKGROUND_COLORS } from '../../utils/constants'

interface VerticalDividerProps {
  style?: string
}
const VerticalDivider = ({ style = '' }: VerticalDividerProps) => {
  return (
    <View
      style={tw`absolute left-7 w-[1px] h-full ${BACKGROUND_COLORS.GRAY} ${style}`}
    />
  )
}

export default VerticalDivider
