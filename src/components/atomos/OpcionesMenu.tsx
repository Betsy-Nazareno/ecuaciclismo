import * as React from 'react'
import { View, Image, Pressable } from 'react-native'
import tw from 'twrnc'
import { TEXT_COLORS } from '../../utils/constants'
import Ruler from './Ruler'
import { CustomText } from './CustomText'

interface MenuProps {
  handleEdit: () => void
  handleDelete: () => void
  handlePin: () => void
  pinLabel: string
}

const OpcionesMenu = ({
  handleEdit,
  handleDelete,
  handlePin,
  pinLabel,
}: MenuProps) => {
  return (
    <View
      style={tw`absolute top-6 right-4 bg-white z-40 py-1 rounded-lg shadow-md w-44`}
    >
      <Pressable onPress={handlePin}>
        <View style={tw`flex flex-row items-center py-4 px-8`}>
          <Image
            source={require('../../../assets/pin_icon.png')}
            style={{ width: 20, height: 20, marginRight: 16 }}
          />
          <CustomText style={`${TEXT_COLORS.DARK_BLUE} font-semibold text-sm`}>
            {pinLabel}
          </CustomText>
        </View>
      </Pressable>

      <Ruler style="w-11/12 mx-auto" />

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

      <Pressable onPress={handleDelete}>
        <View style={tw`flex flex-row items-center py-4 px-8 `}>
          <Image
            source={require('../../../assets/bin_icon.png')}
            style={{ width: 17, height: 17, marginRight: 16 }}
          />
          <CustomText style={`${TEXT_COLORS.DARK_BLUE} font-semibold text-sm`}>
            Eliminar
          </CustomText>
        </View>
      </Pressable>
    </View>
  )
}

export default OpcionesMenu
