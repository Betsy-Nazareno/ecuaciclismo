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
}

const RoundedButtonIcon = ({
  handleClick,
  src,
  style = '',
  dimension = 18,
}: RoundedButtonProps) => {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#E7F5FF"
      onPress={handleClick}
      style={{ borderRadius: 100 / 2 }}
    >
      <View
        style={tw`h-10 w-10 rounded-full flex items-center justify-center ${BACKGROUND_COLORS.PRIMARY_BLUE} ${style}`}
      >
        <Image source={src} style={{ width: dimension, height: dimension }} />
      </View>
    </TouchableHighlight>
  )
}

export default RoundedButtonIcon
