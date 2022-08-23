import * as React from 'react'
import { Image, ImageSourcePropType, Text, View } from 'react-native'
import tw from 'twrnc'
import { TEXT_COLORS } from '../../utils/constants'

interface RowWithImageProps {
  icon: ImageSourcePropType
  text: string
  styleText?: string
}

const RowWithImage = ({ icon, text, styleText }: RowWithImageProps) => {
  return (
    <View style={tw`flex flex-row items-center `}>
      <Image source={icon} style={{ width: 20, height: 20, marginRight: 12 }} />
      <Text style={tw`${TEXT_COLORS.DARK_GRAY} ${styleText || ''}`}>
        {text}
      </Text>
    </View>
  )
}

export default RowWithImage
