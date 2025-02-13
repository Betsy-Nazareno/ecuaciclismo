import React from 'react'
import { Image, Text, View } from 'react-native'
import tw from 'twrnc'
import { TEXT_COLORS } from '../../utils/constants'
import { ButtonTab } from '../atomos/ButtonTab'

const NavigationBar = () => {
  return (
    <View
      style={[
        tw`w-full border-solid border-gray-200 bg-white`,
        { borderWidth: 1 },
      ]}
    >
      <View style={tw`flex flex-row justify-between p-[2%]`}>
        <ButtonTab screen="Inicio">
          <Image
            source={require('../../../assets/home_active_icon.png')}
            style={{ width: 25, height: 25 }}
          />
          <Text style={tw`${TEXT_COLORS.DARK_BLUE} text-xs font-bold`}>
            Inicio
          </Text>
        </ButtonTab>

        <ButtonTab screen="Publicaciones">
          <Image
            source={require('../../../assets/publicaciones_icon.png')}
            style={{ width: 28, height: 28 }}
          />
          <Text style={tw`${TEXT_COLORS.DARK_BLUE} text-xs font-bold`}>
            Publicaciones
          </Text>
        </ButtonTab>

        <ButtonTab screen="Rutas">
          <Image
            source={require('../../../assets/ubicacion_icon.png')}
            style={{ width: 30, height: 25 }}
          />
          <Text style={tw`${TEXT_COLORS.DARK_BLUE} text-xs font-bold`}>
            Rutas
          </Text>
        </ButtonTab>

        <ButtonTab screen="AlertaFormulario">
          <Image
            source={require('../../../assets/nueva_alerta.png')}
            style={{ width: 25, height: 25 }}
          />

          <Text style={tw`${TEXT_COLORS.DARK_BLUE} text-xs font-bold`}>
            Crear Alerta
          </Text>
        </ButtonTab>
      </View>
    </View>
  )
}

export default NavigationBar
