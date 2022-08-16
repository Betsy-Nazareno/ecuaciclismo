import * as React from 'react'
import tw from 'twrnc'
import { View, Pressable, Image } from 'react-native'
import { CustomText } from './CustomText'
import { TEXT_COLORS } from '../../utils/constants'
import Ruler from './Ruler'

interface OpcionesMenuPulicacionesProps {
  canEdit?: boolean
  setDisplay: (value: boolean) => void
  handleEdit: () => void
  handleDelete: () => void
}

const OpcionesMenuPulicaciones = ({
  canEdit = true,
  setDisplay,
  handleEdit,
  handleDelete,
}: OpcionesMenuPulicacionesProps) => {
  return (
    <View
      style={tw`absolute top-6 right-4 bg-white z-40 py-1 rounded-lg shadow-md w-44`}
    >
      {canEdit && (
        <>
          <Pressable
            onPress={handleEdit}
            onBlur={() => setDisplay(false)}
            onPressOut={() => setDisplay(false)}
            onTouchEnd={() => setDisplay(false)}
          >
            <View style={tw`flex flex-row items-center py-4 px-8`}>
              <Image
                source={require('../../../assets/edit_blue_icon.png')}
                style={{ width: 20, height: 20, marginRight: 16 }}
              />
              <CustomText
                style={`${TEXT_COLORS.DARK_BLUE} font-semibold text-sm`}
              >
                Editar
              </CustomText>
            </View>
          </Pressable>
          <Ruler style="w-11/12 mx-auto" />
        </>
      )}
      <Pressable onPress={handleDelete}>
        <View style={tw`flex flex-row items-center py-4 px-8 `}>
          <Image
            source={require('../../../assets/bin_icon.png')}
            style={{ width: 20, height: 20, marginRight: 16 }}
          />
          <CustomText style={`${TEXT_COLORS.DARK_BLUE} font-semibold text-sm`}>
            Eliminar
          </CustomText>
        </View>
      </Pressable>
    </View>
  )
}

export default OpcionesMenuPulicaciones
