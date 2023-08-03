import * as React from 'react'
import tw from 'twrnc'
import { View, Pressable, Image } from 'react-native'
import { CustomText } from './CustomText'
import { TEXT_COLORS } from '../../utils/constants'
import Ruler from './Ruler'

interface OpcionesMenuAlertasProps {
  handleVerAlerta: () => void
  handleCrearAlerta: () => void
}

const OpcionesMenuAlertaRuta = ({
    handleVerAlerta,
    handleCrearAlerta,

}: OpcionesMenuAlertasProps) => {
  return (
    <View
      style={tw`absolute top-25 right-12 bg-white z-40 py-1 rounded-lg shadow-md w-44`}
    >
          <Pressable onPress={handleVerAlerta}
          >
            <View style={tw`flex flex-row items-center py-4 px-8`}>
              <Image
                source={require('../../../assets/mis_alertas.png')}
                style={{ width: 20, height: 20, marginRight: 16 }}
              />
              <CustomText
                style={`${TEXT_COLORS.DARK_BLUE} font-semibold text-sm`}
              >
                Ver mis alertas
              </CustomText>
            </View>
          </Pressable>
          <Ruler style="w-11/12 mx-auto" />
  

      <Pressable onPress={handleCrearAlerta}>
        <View style={tw`flex flex-row items-center py-4 px-8 `}>
          <Image
            source={require('../../../assets/crear_alerta.png')}
            style={{ width: 20, height: 20, marginRight: 16 }}
          />
          <CustomText style={`${TEXT_COLORS.DARK_BLUE} font-semibold text-sm`}>
            Crear alerta
          </CustomText>
        </View>
      </Pressable>
    </View>
  )
}

export default OpcionesMenuAlertaRuta
