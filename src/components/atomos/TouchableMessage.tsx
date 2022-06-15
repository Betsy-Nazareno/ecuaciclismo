import * as React from 'react'
import { Text, View, Pressable } from 'react-native'
import tw from 'twrnc'

interface TouchableMessageProps {
  text: string
  style: string
  handleClick: () => void
}

const TouchableMessage = ({
  text,
  style,
  handleClick,
}: TouchableMessageProps) => {
  return (
    <Pressable onPress={handleClick}>
      <View style={tw`${style}`}>
        <Text style={tw`text-[#F16F31] text-sm text-center`}>{text}</Text>
      </View>
    </Pressable>
  )
}

export default TouchableMessage
