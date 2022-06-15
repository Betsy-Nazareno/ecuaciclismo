import * as React from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import tw from 'twrnc'

interface ButtonPrimaryProps {
  label: string
  handleClick?: () => void
}

const ButtonPrimary = ({ label, handleClick }: ButtonPrimaryProps) => {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#E7F5FF"
      onPress={handleClick}
    >
      <View style={tw`bg-[#2D84C4] py-3 px-6 rounded-md`}>
        <Text style={tw`text-center font-bold text-white text-base`}>
          {label}
        </Text>
      </View>
    </TouchableHighlight>
  )
}

export default ButtonPrimary
