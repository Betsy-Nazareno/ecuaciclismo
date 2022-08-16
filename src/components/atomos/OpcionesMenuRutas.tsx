import * as React from 'react'
import tw from 'twrnc'
import { Image, Pressable, View } from 'react-native'
import { CustomText } from './CustomText'
import { TEXT_COLORS } from '../../utils/constants'
import Ruler from './Ruler'

interface OpcionesMenuRutasProps {
  handleEdit: () => void
  handleCancelar: () => void
}

const OpcionesMenuRutas = ({
  handleEdit,
  handleCancelar,
}: OpcionesMenuRutasProps) => {
  return (
    <View
      style={tw`absolute top-6 right-4 bg-white z-40 py-1 rounded-lg shadow-md w-44`}
    >
      <Pressable onPress={handleEdit}>
        <View style={tw`flex flex-row items-center py-4 px-8`}>
          <Image
            source={require('../../../assets/edit_blue_icon.png')}
            style={{ width: 17, height: 17, marginRight: 16 }}
          />
          <CustomText style={`${TEXT_COLORS.DARK_BLUE} font-semibold text-sm`}>
            Editar
          </CustomText>
        </View>
      </Pressable>
      <Ruler style="w-11/12 mx-auto" />

      <Pressable onPress={handleCancelar}>
        <View style={tw`flex flex-row items-center py-4 px-8 `}>
          <Image
            source={require('../../../assets/cancelar_icon.png')}
            style={{ width: 17, height: 17, marginRight: 16 }}
          />
          <CustomText style={`${TEXT_COLORS.DARK_BLUE} font-semibold text-sm`}>
            Cancelar
          </CustomText>
        </View>
      </Pressable>
    </View>
  )
}

export default OpcionesMenuRutas
