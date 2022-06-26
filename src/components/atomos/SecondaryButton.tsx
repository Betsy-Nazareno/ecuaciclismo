import * as React from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import tw from 'twrnc'
import { BACKGROUND_COLORS } from '../../../utils/constants'

interface SecondaryButtonProps {
  label: string
  handleClick?: () => void
  style: string
}

const SecondaryButton = ({
  label,
  style,
  handleClick,
}: SecondaryButtonProps) => {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#E7F5FF"
      onPress={handleClick}
    >
      <View style={tw`${style} ${BACKGROUND_COLORS.ORANGE} py-3 rounded-3xl`}>
        <Text style={tw`text-center font-bold text-white text-base`}>
          {label}
        </Text>
      </View>
    </TouchableHighlight>
  )
}

export default SecondaryButton
