import * as React from 'react'
import { Text, Pressable } from 'react-native'
import tw from 'twrnc'

interface ButtonUnderlineProps {
  label: string
  handleClick: () => void
  style?: string
}

const ButtonUnderline = ({
  label,
  handleClick,
  style = '',
}: ButtonUnderlineProps) => {
  return (
    <Pressable onPress={handleClick}>
      <Text style={tw`underline font-semibold ${style}`}>{label}</Text>
    </Pressable>
  )
}

export default ButtonUnderline
