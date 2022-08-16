import { NavigationProp, useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { Image, Text, View } from 'react-native'
import tw from 'twrnc'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import {
  BACKGROUND_COLORS,
  HEIGHT_DIMENSIONS,
  TEXT_COLORS,
  WIDTH_DIMENSIONS,
} from '../../../utils/constants'
import ButtonPrimary from '../../atomos/ButtonPrimary'
import { CustomText } from '../../atomos/CustomText'
import HeaderRoundedContainer from '../../moleculas/HeaderRoundedContainer'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'

const RastreoMain = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
  return (
    <View style={tw`px-2`}>
      <HeaderRoundedContainer>
        <CustomText
          style={`text-3xl ${TEXT_COLORS.DARK_BLUE}`}
          containerProps={{ textAlign: 'center' }}
        >
          Ruta Salinas
        </CustomText>

        <View style={tw`w-9/12 mx-auto mt-8`}>
          <Text style={tw`${TEXT_COLORS.DARK_GRAY} text-center text-base`}>
            Duración 9:00 - 11:00 AM
          </Text>
          <Text style={tw`${TEXT_COLORS.DARK_GRAY} text-center text-base`}>
            (Aproximadamente 2 horas)
          </Text>
        </View>
        <View style={tw`w-9/12 mx-auto mt-4 mb-2`}>
          <Text style={tw`${TEXT_COLORS.DARK_GRAY} text-center text-base`}>
            24 Participates registrados
          </Text>
        </View>
      </HeaderRoundedContainer>

      <RoundedWhiteBaseTemplate shadow={false}>
        <Image
          source={require('../../../../assets/rastreo_ruta_icon.png')}
          style={{
            width: WIDTH_DIMENSIONS * 0.9,
            height: HEIGHT_DIMENSIONS * 0.5,
            marginTop: 6,
            marginBottom: 4,
          }}
          resizeMode="contain"
        />
        <View style={tw`w-8/12 mx-auto`}>
          <ButtonPrimary
            label="Iniciar Ruta"
            style={`w-full ${BACKGROUND_COLORS.PRIMARY_BLUE} rounded-xl`}
            icon={require('../../../../assets/rastreo_icon.png')}
            handleClick={() => navigation.navigate('RastreoUbicacion')}
          />
        </View>
      </RoundedWhiteBaseTemplate>
    </View>
  )
}

export default RastreoMain
