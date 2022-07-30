import * as React from 'react'
import tw from 'twrnc'
import { View, Image } from 'react-native'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import { WIDTH_DIMENSIONS } from '../../../utils/constants'
import TitleWithDivider from '../../moleculas/TitleWithDivider'
import Carousel from 'react-native-carousel-loop/lib'

const RutaFotos = () => {
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
          <Image
            source={require('../../../../assets/rutaa1.png')}
            style={{ width: WIDTH_DIMENSIONS * 0.86, height: 250 }}
          />
          <Image
            source={require('../../../../assets/rutaa2.png')}
            style={{ width: WIDTH_DIMENSIONS * 0.86, height: 250 }}
          />
        </Carousel>
      </View>
    </RoundedWhiteBaseTemplate>
  )
}

export default RutaFotos
