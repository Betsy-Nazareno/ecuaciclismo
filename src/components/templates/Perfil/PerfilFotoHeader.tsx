import * as React from 'react'
import tw from 'twrnc'
import { View, Image } from 'react-native'
import {
  HEIGHT_DIMENSIONS,
  TEXT_COLORS,
  WIDTH_DIMENSIONS,
} from '../../../utils/constants'
import RoundedButtonIcon from '../../atomos/RoundedButtonIcon'
import { CustomText } from '../../atomos/CustomText'

const PerfilFotoHeader = () => {
  return (
    <>
      <View style={tw`relative mb-6`}>
        <Image
          source={require('../../../../assets/lorena.jpg')}
          style={{ width: WIDTH_DIMENSIONS, height: HEIGHT_DIMENSIONS * 0.6 }}
          resizeMode="cover"
        />
        <RoundedButtonIcon
          src={require('../../../../assets/edit_white_icon.png')}
          handleClick={() => {
            return
          }}
          style="absolute -bottom-6 right-2 w-12 h-12"
          dimension={27}
        />
      </View>

      <CustomText
        containerProps={{ textAlign: 'center' }}
        style={`text-3xl ${TEXT_COLORS.DARK_BLUE}`}
      >
        Lorena Miranda
      </CustomText>

      <View style={tw`mt-1`}>
        <CustomText
          containerProps={{ textAlign: 'center' }}
          style={`text-xl ${TEXT_COLORS.ORANGE}`}
        >
          Ciclista
        </CustomText>
      </View>
    </>
  )
}

export default PerfilFotoHeader
