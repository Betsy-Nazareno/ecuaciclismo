import * as React from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import tw from 'twrnc'

interface ButtonPrimaryProps {
  label: string
  handleClick?: () => void
  style: string
}

const ButtonPrimary = ({ label, style, handleClick }: ButtonPrimaryProps) => {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#E7F5FF"
      onPress={handleClick}
    >
      <View style={tw`py-3 px-6 rounded-md ${style}`}>
        <Text style={tw`text-center font-bold text-white text-base`}>
          {label}
        </Text>
      </View>
    </TouchableHighlight>
  )
}

export default ButtonPrimary
