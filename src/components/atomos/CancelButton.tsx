import * as React from 'react'
import tw from 'twrnc'
import { Pressable, Image } from 'react-native'

interface CancelButtonProps {
  handleClick?: (value: string) => void
  value?: string
  styles?: string
  size?: number
}

const CancelButton = ({
  handleClick,
  value,
  styles,
  size = 15,
}: CancelButtonProps) => {
  return (
    <Pressable
      onPress={() => handleClick?.(value || '')}
      style={tw`absolute -top-1 -right-5 w-8 ${styles || ''}`}
    >
      <Image
        source={require('../../../assets/cancel_icon.png')}
        style={{ width: size, height: size }}
      />
    </Pressable>
  )
}

export default CancelButton
