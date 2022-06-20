import * as React from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import tw from 'twrnc'
import { BACKGROUND_COLORS } from '../../../utils/constants'

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
      <View style={tw`${BACKGROUND_COLORS.SKY_BLUE} py-3 px-6 rounded-md`}>
        <Text style={tw`text-center font-bold text-white text-base`}>
          {label}
        </Text>
      </View>
    </TouchableHighlight>
  )
}

export default ButtonPrimary
