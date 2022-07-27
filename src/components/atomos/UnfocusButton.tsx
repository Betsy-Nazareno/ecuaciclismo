import * as React from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import tw from 'twrnc'
import { TEXT_COLORS } from '../../utils/constants'

interface UnfocusButtonProps {
  label: string
  handleClick?: () => void
  style: string
}

const UnfocusButton = ({ label, style, handleClick }: UnfocusButtonProps) => {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#E7F5FF"
      onPress={handleClick}
    >
      <View style={tw`${style} bg-white py-3 rounded-3xl`}>
        <Text
          style={tw`text-center font-bold ${TEXT_COLORS.DARK_BLUE} text-base`}
        >
          {label}
        </Text>
      </View>
    </TouchableHighlight>
  )
}

export default UnfocusButton
