import * as React from 'react'
import tw from 'twrnc'
import { Text, View, Image } from 'react-native'
import { CustomText } from '../../atomos/CustomText'
import HeaderRoundedContainer from '../../moleculas/HeaderRoundedContainer'
import {
  HEIGHT_DIMENSIONS,
  TEXT_COLORS,
  WIDTH_DIMENSIONS,
} from '../../../utils/constants'
import Input from '../../moleculas/Input'

const ReporteRutaIncompleta = () => {
  return (
    <View style={tw`px-2`}>
      <HeaderRoundedContainer>
        <CustomText
          containerProps={{ textAlign: 'center' }}
          style={`${TEXT_COLORS.DARK_BLUE} text-3xl`}
        >
          ¡Sigue así!
        </CustomText>

        <View style={tw`flex flex-col items-center`}>
          <Image
            source={require('../../../../assets/ruta_incompleta_icon.png')}
            style={{
              width: WIDTH_DIMENSIONS * 0.5,
              height: HEIGHT_DIMENSIONS * 0.3,
            }}
            resizeMode="contain"
          />
          <View style={tw`mt-2 mb-8`}>
            <Text
              style={tw`${TEXT_COLORS.GRAY_PLACEHOLDER} text-lg text-center`}
            >
              Continua practicando.
            </Text>
            <Text
              style={tw`${TEXT_COLORS.GRAY_PLACEHOLDER} text-lg text-center`}
            >
              ¡Nos vemos en la siguiente ruta!
            </Text>
          </View>
        </View>
      </HeaderRoundedContainer>

      <View style={tw`mt-4 flex flex-col items-center`}>
        <Text
          style={tw`${TEXT_COLORS.DARK_BLUE} text-xl text-center font-semibold`}
        >
          ¿Qué te pareció esta ruta?
        </Text>
        <Image
          source={require('../../../../assets/estrella.png')}
          style={{
            width: WIDTH_DIMENSIONS * 0.6,
            height: 25,
            marginVertical: 6,
          }}
          resizeMode="contain"
        />
        <Input
          type="none"
          stylesInput={'bg-white'}
          placeholder="Dejanos un comentario"
          stylesProp="w-9/12"
        />
      </View>
    </View>
  )
}

export default ReporteRutaIncompleta
