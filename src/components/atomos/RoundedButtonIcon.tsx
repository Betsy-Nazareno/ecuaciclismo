import * as React from 'react'
import {
  View,
  TouchableHighlight,
  Image,
  ImageSourcePropType,
} from 'react-native'
import tw from 'twrnc'
import { BACKGROUND_COLORS } from '../../../utils/constants'
interface RoundedButtonProps {
  handleClick: () => void
  src: ImageSourcePropType
}

const RoundedButtonIcon = ({ handleClick, src }: RoundedButtonProps) => {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#E7F5FF"
      onPress={handleClick}
    >
      <View
        style={tw`${BACKGROUND_COLORS.PRIMARY_BLUE} shadow-xl h-13 w-13 rounded-full flex items-center justify-center`}
      >
        <Image source={src} style={{ width: 25, height: 24 }} />
      </View>
    </TouchableHighlight>
  )
}

export default RoundedButtonIcon
