import { NavigationProp, useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { Image, Text, View } from 'react-native'
import tw from 'twrnc'
import { Ruta } from '../../../models/Rutas'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import {
  BACKGROUND_COLORS,
  HEIGHT_DIMENSIONS,
  TEXT_COLORS,
  WIDTH_DIMENSIONS,
} from '../../../utils/constants'
import { getHorasEstimadas } from '../../../utils/rastreoCalculations'
import ButtonPrimary from '../../atomos/ButtonPrimary'
import { CustomText } from '../../atomos/CustomText'
import HeaderRoundedContainer from '../../moleculas/HeaderRoundedContainer'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'

interface RastreoMainProp {
  ruta: Ruta
}

const RastreoMain = ({ ruta }: RastreoMainProp) => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()

  const getDatesRange = () => {
    const { fecha_inicio, fecha_fin } = ruta || {}
    const dateStart = new Date(fecha_inicio || '')
    const dateEnd = new Date(fecha_fin || '')
    const inicio = `${dateStart?.getHours()}:${dateStart?.getMinutes()}`
    const fin = `${dateEnd?.getHours()}:${dateEnd?.getMinutes()}`
    return inicio + ' - ' + fin
  }

  return (
    <View style={tw`px-2`}>
      <HeaderRoundedContainer>
        <CustomText
          style={`text-3xl ${TEXT_COLORS.DARK_BLUE}`}
          containerProps={{ textAlign: 'center' }}
        >
          {ruta?.nombre}
        </CustomText>

        <View style={tw`w-9/12 mx-auto mt-8`}>
          <Text style={tw`${TEXT_COLORS.DARK_GRAY} text-center text-base`}>
            Duración {getDatesRange()}
          </Text>
          <Text style={tw`${TEXT_COLORS.DARK_GRAY} text-center text-base`}>
            (Aproximadamente{' '}
            {getHorasEstimadas(ruta.fecha_inicio, ruta.fecha_fin)} horas)
          </Text>
        </View>
        <View style={tw`w-9/12 mx-auto mt-4 mb-2`}>
          <Text style={tw`${TEXT_COLORS.DARK_GRAY} text-center text-base`}>
            {ruta?.participantes?.length || 0} Participates registrados
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
            handleClick={() =>
              navigation.navigate('RastreoUbicacion', { ruta })
            }
          />
        </View>
      </RoundedWhiteBaseTemplate>
    </View>
  )
}

export default RastreoMain
