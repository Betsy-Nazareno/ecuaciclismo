import * as React from 'react'
import tw from 'twrnc'
import { View, Image } from 'react-native'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import { WIDTH_DIMENSIONS } from '../../../utils/constants'
import TitleWithDivider from '../../moleculas/TitleWithDivider'
import Carousel from 'react-native-snap-carousel';

const RutaFotos = ({ fotos }: any) => {
  return (
    <RoundedWhiteBaseTemplate shadow={false}>
    <TitleWithDivider label="Galería" />
    <View style={tw`my-4`}>
      <Carousel
        data={fotos}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.link }}
            style={{
              width: WIDTH_DIMENSIONS * 0.86,
              height: 250,
              borderRadius: 20 / 2,
            }}
          />
        )}
        sliderWidth={WIDTH_DIMENSIONS}
        itemWidth={WIDTH_DIMENSIONS * 0.86}
        layout={'default'}
        autoplay
        loop
      />
      </View>
    </RoundedWhiteBaseTemplate>
  )
}

export default RutaFotos
