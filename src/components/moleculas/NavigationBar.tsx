import React from 'react'
import { Image, View } from 'react-native'
import tw from 'twrnc'
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
        </ButtonTab>

        <ButtonTab screen="Publicaciones">
          <Image
            source={require('../../../assets/publicaciones_icon.png')}
            style={{ width: 28, height: 28 }}
          />
        </ButtonTab>

        <ButtonTab screen="Rutas">
          <Image
            source={require('../../../assets/ubicacion_icon.png')}
            style={{ width: 30, height: 25 }}
          />
        </ButtonTab>

        <ButtonTab screen="Perfil">
          <Image
            source={require('../../../assets/ciclista_icon.png')}
            style={{ width: 25, height: 25 }}
          />
        </ButtonTab>
      </View>
    </View>
  )
}

export default NavigationBar
