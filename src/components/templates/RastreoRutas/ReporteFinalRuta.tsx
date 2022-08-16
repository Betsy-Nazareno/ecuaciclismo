import * as React from 'react'
import tw from 'twrnc'
import { Image, Text, View } from 'react-native'
import { CustomText } from '../../atomos/CustomText'
import {
  BACKGROUND_COLORS,
  TEXT_COLORS,
  WIDTH_DIMENSIONS,
} from '../../../utils/constants'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import Input from '../../moleculas/Input'
import Ruler from '../../atomos/Ruler'

const ReporteFinalRuta = () => {
  return (
    <View style={tw`pt-6 flex flex-col items-center`}>
      <CustomText
        style={`${TEXT_COLORS.DARK_BLUE} text-2xl`}
        containerProps={{ textAlign: 'center' }}
      >
        ¡Felicidades Lorena!
      </CustomText>
      <View style={tw`relative`}>
        <Image
          source={require('../../../../assets/lorena.jpg')}
          style={{
            width: 200,
            height: 200,
            borderRadius: 1000 / 2,
            borderWidth: 12,
            borderColor: '#fff',
            marginVertical: 12,
          }}
        />
        <Image
          source={require('../../../../assets/lazo.png')}
          style={{
            width: 50,
            height: 90,
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}
          resizeMode="contain"
        />
      </View>

      <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-xl`}>
        Tus hitos en Ruta Salinas{' '}
      </Text>

      <View style={tw`w-10/12 mt-4`}>
        <RoundedWhiteBaseTemplate shadow={false}>
          <View style={tw`flex flex-row items-center pl-4`}>
            <Image
              source={require('../../../../assets/reloj_icon.png')}
              style={{
                width: 30,
                height: 30,
                marginRight: 24,
              }}
            />
            <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-semibold text-base`}>
              2 horas de recorrido
            </Text>
          </View>
        </RoundedWhiteBaseTemplate>
      </View>

      <View style={tw`w-10/12 mt-2`}>
        <RoundedWhiteBaseTemplate shadow={false}>
          <View style={tw`flex flex-row items-center pl-4`}>
            <Image
              source={require('../../../../assets/rastreo_ruta_icon.png')}
              style={{
                width: 30,
                height: 30,
                marginRight: 24,
              }}
            />
            <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-semibold text-base`}>
              215 Km pedaleados
            </Text>
          </View>
        </RoundedWhiteBaseTemplate>
      </View>

      <View style={tw`w-10/12 mt-2`}>
        <RoundedWhiteBaseTemplate shadow={false}>
          <View style={tw`flex flex-row items-center pl-4`}>
            <Image
              source={require('../../../../assets/velocidad_icon.png')}
              style={{
                width: 30,
                height: 30,
                marginRight: 24,
              }}
            />
            <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-semibold text-base`}>
              Velocidad 14 km/h
            </Text>
          </View>
        </RoundedWhiteBaseTemplate>
      </View>

      <Ruler style={`w-7/12 mt-6 ${BACKGROUND_COLORS.GRAY}`} />

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
          stylesProp="w-full"
        />
      </View>
    </View>
  )
}

export default ReporteFinalRuta
