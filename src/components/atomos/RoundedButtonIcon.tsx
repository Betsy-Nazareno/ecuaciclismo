import * as React from 'react'
import {
  View,
  TouchableHighlight,
  Image,
  ImageSourcePropType,
  
} from 'react-native'
import tw from 'twrnc'
import { BACKGROUND_COLORS } from '../../utils/constants'
interface RoundedButtonProps {
  handleClick: () => void
  src: ImageSourcePropType
  style?: string
  dimension?: number
  background?: string; // Nueva prop para el background opcional
}

const RoundedButtonIcon = ({
  handleClick,
  src,
  style = '',
  dimension = 18,
  background = BACKGROUND_COLORS.PRIMARY_BLUE,
}: RoundedButtonProps) => {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#E7F5FF"
      onPress={handleClick}
      style={{ borderRadius: 100 / 2 }}
    >
      <View
        style={tw`h-10 w-10 rounded-full flex items-center justify-center ${background} ${style}`}
      >
        <Image source={src} style={{ width: dimension, height: dimension }} />
      </View>
    </TouchableHighlight>
  )
}

export default RoundedButtonIcon
