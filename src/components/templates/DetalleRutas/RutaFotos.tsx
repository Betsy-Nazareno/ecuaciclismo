import * as React from 'react'
import tw from 'twrnc'
import { View, Image } from 'react-native'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import { WIDTH_DIMENSIONS } from '../../../utils/constants'
import TitleWithDivider from '../../moleculas/TitleWithDivider'
import Carousel from 'react-native-carousel-loop/lib'

const RutaFotos = ({ fotos }: any) => {
  return (
    <RoundedWhiteBaseTemplate shadow={false}>
      <TitleWithDivider label="Galería" />
      <View style={tw`my-4`}>
        <Carousel
          swipe
          bullets
          style={{
            width: WIDTH_DIMENSIONS * 0.86,
            height: 250,
            borderRadius: 20 / 2,
          }}
        >
          {fotos?.map((foto: any, index: number) => (
            <Image
              key={index}
              source={{ uri: foto.link }}
              style={{ width: WIDTH_DIMENSIONS * 0.86, height: 250 }}
            />
          ))}
        </Carousel>
      </View>
    </RoundedWhiteBaseTemplate>
  )
}

export default RutaFotos
