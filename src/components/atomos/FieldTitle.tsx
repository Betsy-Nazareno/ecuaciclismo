import * as React from 'react'
import tw from 'twrnc'
import { Text } from 'react-native'
import { TEXT_COLORS } from '../../utils/constants'

interface FieldTitleProps {
  text: string
}

const FieldTitle = ({ text }: FieldTitleProps) => {
  return (
    <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
      {text}
    </Text>
  )
}

export default FieldTitle
