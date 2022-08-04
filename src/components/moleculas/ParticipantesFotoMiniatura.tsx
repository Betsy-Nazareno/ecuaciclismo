import * as React from 'react'
import tw from 'twrnc'
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  ImageSourcePropType,
} from 'react-native'
import ViewMoreRounded from '../atomos/ViewMoreRounded'

interface ParticipantesFotoMiniaturaProps {
  dimensionImages?: number
  images?: ImageSourcePropType[]
}

const ParticipantesFotoMiniatura = ({
  dimensionImages = 40,
  images,
}: ParticipantesFotoMiniaturaProps) => {
  return (
    <View style={tw`flex flex-row`}>
      {images?.map((image, index) => (
        <Image
          key={index}
          source={image}
          style={{
            width: dimensionImages,
            height: dimensionImages,
            borderRadius: 100 / 2,
            marginLeft: -10,
          }}
        />
      ))}

      {/* <View>
        <Image
          source={require('../../../assets/lorena.jpg')}
          style={{
            width: dimensionImages,
            height: dimensionImages,
            borderRadius: 100 / 2,
            marginLeft: -10,
          }}
        />
      </View>
      <View>
        <Image
          source={require('../../../assets/lorena.jpg')}
          style={{
            width: dimensionImages,
            height: dimensionImages,
            borderRadius: 100 / 2,
            marginLeft: -10,
          }}
        />
      </View>

      <View>
        <Image
          source={require('../../../assets/lorena.jpg')}
          style={{
            width: dimensionImages,
            height: dimensionImages,
            borderRadius: 100 / 2,
            marginLeft: -10,
          }}
        />
      </View>

      <View>
        <Image
          source={require('../../../assets/lorena.jpg')}
          style={{
            width: dimensionImages,
            height: dimensionImages,
            borderRadius: 100 / 2,
            marginLeft: -10,
          }}
        />
      </View>

      <View>
        <Image
          source={require('../../../assets/lorena.jpg')}
          style={{
            width: dimensionImages,
            height: dimensionImages,
            borderRadius: 100 / 2,
            marginLeft: -10,
          }}
        />
      </View>

      <View>
        <Image
          source={require('../../../assets/lorena.jpg')}
          style={{
            width: dimensionImages,
            height: dimensionImages,
            borderRadius: 100 / 2,
            marginLeft: -10,
          }}
        />
      </View>

      <View>
        <Image
          source={require('../../../assets/lorena.jpg')}
          style={{
            width: dimensionImages,
            height: dimensionImages,
            borderRadius: 100 / 2,
            marginLeft: -10,
          }}
        />
      </View>

      <View>
        <Image
          source={require('../../../assets/lorena.jpg')}
          style={{
            width: dimensionImages,
            height: dimensionImages,
            borderRadius: 100 / 2,
            marginLeft: -10,
          }}
        />
      </View> */}

      <ViewMoreRounded label="+34" dimension={dimensionImages} />
    </View>
  )
}

export default ParticipantesFotoMiniatura

const styles = StyleSheet.create({
  container: {},
})
