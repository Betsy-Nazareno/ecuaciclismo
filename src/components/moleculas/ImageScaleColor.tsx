import * as React from 'react'
import tw from 'twrnc'
import { View, Image, ImageSourcePropType } from 'react-native'

interface ImageScaleColorProps {
  scale: 'gray' | 'red' | 'none'
  image: ImageSourcePropType
}

const ImageScaleColor = ({ scale, image }: ImageScaleColorProps) => {
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
    </View>
  )
}

export default ImageScaleColor
