import { Text } from 'react-native'
import tw from 'twrnc'
import { TEXT_COLORS } from '../../../utils/constants'
import React from 'react'

export const FieldError = (message: string) => {
  return (
    <Text style={tw`text-xs ${TEXT_COLORS.ORANGE} mt-1 px-2`}>{message}</Text>
  )
}
