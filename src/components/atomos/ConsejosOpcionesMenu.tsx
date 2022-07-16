import * as React from 'react'
import { View, Image, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'twrnc'
import { TEXT_COLORS } from '../../utils/constants'
import Ruler from './Ruler'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../models/Screens.types'
import { Consejo } from '../../models/Consejo.model'
import { eliminarConsejo } from '../../lib/services/consejos.services'
import { RootState } from '../../redux/store'
import { setHasModified } from '../../redux/consejo'
import { CustomText } from './CustomText'

interface MenuProps {
  setDisplay: (value: boolean) => void
  consejo: Consejo
}

const ConsejosOpcionesMenu = ({ setDisplay, consejo }: MenuProps) => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const { hasModified } = useSelector((state: RootState) => state.consejo)
  const dispatch = useDispatch()
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()

  const changeScreen = () => {
    navigation.navigate('ConsejoFormulario', { consejo })
    setDisplay(false)
  }

  const deleteConsejo = async () => {
    dispatch(setHasModified({ hasModified: !hasModified }))
    consejo.token &&
      (await eliminarConsejo(authToken as string, consejo.token as string))
    setDisplay(false)
  }

  return (
    <View
      style={tw`absolute top-6 right-4 bg-white z-40 py-1 rounded-lg shadow-md w-44`}
    >
      <Pressable
        onPress={changeScreen}
        onBlur={() => setDisplay(false)}
        onPressOut={() => setDisplay(false)}
        onTouchEnd={() => setDisplay(false)}
      >
        <View style={tw`flex flex-row items-center py-4 px-8`}>
          <Image
            source={require('../../../assets/edit_blue_icon.png')}
            style={{ width: 20, height: 20, marginRight: 16 }}
          />
          <CustomText style={`${TEXT_COLORS.DARK_BLUE} font-semibold text-sm`}>
            Editar
          </CustomText>
        </View>
      </Pressable>
      <Ruler style="w-11/12 mx-auto" />
      <Pressable onPress={deleteConsejo}>
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

export default ConsejosOpcionesMenu
