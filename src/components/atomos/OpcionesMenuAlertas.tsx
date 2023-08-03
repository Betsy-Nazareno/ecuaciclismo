import * as React from 'react'
import tw from 'twrnc'
import { View, Pressable, Image } from 'react-native'
import { CustomText } from './CustomText'
import { TEXT_COLORS } from '../../utils/constants'
import Ruler from './Ruler'

interface OpcionesMenuAlertasProps {
  handleCancelled: () => void
  handleAttended: () => void
}

const OpcionesMenuAlertas = ({
    handleCancelled,
    handleAttended,

}: OpcionesMenuAlertasProps) => {
  return (
    <View
      style={tw`absolute top-6 right-4 bg-white z-40 py-1 rounded-lg shadow-md w-44`}
    >
          <Pressable onPress={handleAttended}
          >
            <View style={tw`flex flex-row items-center py-4 px-8`}>
              <Image
                source={require('../../../assets/atendido.png')}
                style={{ width: 20, height: 20, marginRight: 16 }}
              />
              <CustomText
                style={`${TEXT_COLORS.DARK_BLUE} font-semibold text-sm`}
              >
                Marcar como atendida
              </CustomText>
            </View>
          </Pressable>
          <Ruler style="w-11/12 mx-auto" />
  

      <Pressable onPress={handleCancelled}>
        <View style={tw`flex flex-row items-center py-4 px-8 `}>
          <Image
            source={require('../../../assets/cancelar_alerta.png')}
            style={{ width: 20, height: 20, marginRight: 16 }}
          />
          <CustomText style={`${TEXT_COLORS.DARK_BLUE} font-semibold text-sm`}>
            Cancelar alerta
          </CustomText>
        </View>
      </Pressable>
    </View>
  )
}

export default OpcionesMenuAlertas
