import * as React from 'react'
import tw from 'twrnc'
import {
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Text,
} from 'react-native'
import { TEXT_COLORS } from '../../utils/constants'

interface ImageScaleColorProps {
  scale: 'gray' | 'red' | 'none'
  image: ImageSourcePropType
  colorBanda: string
  label: string
}

const ImageScaleColor = ({
  scale,
  image,
  colorBanda,
  label,
}: ImageScaleColorProps) => {
  const getTintColor = () => {
    switch (scale) {
      case 'gray':
        return 'gray'
      case 'red':
        return '#FFD9D9'
      default:
        return '#fff'
    }
  }
  return (
    <View style={tw`relative`}>
      <Image
        source={image}
        style={{
          width: 100,
          height: 100,
          borderRadius: 20 / 2,
          ...(scale !== 'none' ? { tintColor: getTintColor() } : {}),
        }}
      />
      <Image
        source={image}
        style={{
          width: 100,
          height: 100,
          borderRadius: 20 / 2,
          opacity: 0.4,
          position: 'absolute',
          top: 0,
        }}
      />
      <View
        style={tw`absolute bottom-1 w-full h-4 ${colorBanda} bg-[#e6e6e6] bg-opacity-80`}
      >
        <Text
          style={tw`${TEXT_COLORS.DARK_BLUE} font-semibold text-xs text-center`}
        >
          {label}
        </Text>
      </View>
    </View>
  )
}

export default ImageScaleColor

const styles = StyleSheet.create({
  container: {},
})
