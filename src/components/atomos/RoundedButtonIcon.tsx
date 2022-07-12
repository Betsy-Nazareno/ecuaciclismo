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
        style={tw`${BACKGROUND_COLORS.PRIMARY_BLUE} shadow-xl h-10 w-10 rounded-full flex items-center justify-center`}
      >
        <Image source={src} style={{ width: 18, height: 17 }} />
      </View>
    </TouchableHighlight>
  )
}

export default RoundedButtonIcon
