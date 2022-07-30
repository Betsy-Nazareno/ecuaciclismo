import * as React from 'react'
import tw from 'twrnc'
import { Text, View, Image } from 'react-native'
import TitleWithDivider from '../../moleculas/TitleWithDivider'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import { TEXT_COLORS } from '../../../utils/constants'

const RutaInformacion = () => {
  let cupos = 2
  cupos = 10
  const getColorCupos = (cupos: number) => {
    if (cupos < 10) {
      return TEXT_COLORS.RED
    }
    return TEXT_COLORS.GREEN_PRIMARY
  }
  return (
    <RoundedWhiteBaseTemplate shadow={false}>
      <TitleWithDivider label="Información" />

      <View style={tw`flex flex-row items-center my-4`}>
        <View style={tw`w-1/12`}>
          <Image
            source={require('../../../../assets/calendar_blue_icon.png')}
            style={{ width: 20, height: 20 }}
          />
        </View>
        <View style={tw`w-11/12 ml-4`}>
          <Text style={tw`${TEXT_COLORS.DARK_BLUE}`}>
            06 de Febrero del 2022 7 AM{' '}
          </Text>
          <Text style={tw`${TEXT_COLORS.DARK_BLUE}`}>Malecón de Salinas</Text>
        </View>
      </View>

      <View style={tw`flex flex-row items-center my-4`}>
        <View style={tw`w-1/12`}>
          <Image
            source={require('../../../../assets/comunidad_icon.png')}
            style={{ width: 25, height: 25 }}
          />
        </View>
        <View style={tw`w-11/12 ml-4`}>
          <Text style={tw`${TEXT_COLORS.DARK_BLUE}`}>
            25 Cupos planificados
          </Text>
          <Text style={tw`${getColorCupos(cupos)}`}>
            {cupos}{' '}
            {cupos === 1
              ? 'disponible'
              : cupos < 1 || cupos > 1
              ? 'disponibles'
              : ''}
          </Text>
        </View>
      </View>
    </RoundedWhiteBaseTemplate>
  )
}

export default RutaInformacion
