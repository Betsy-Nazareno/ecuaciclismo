import * as React from 'react'
import { Text, View, Image, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'twrnc'
import { TEXT_COLORS } from '../../../utils/constants'
import Ruler from './Ruler'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import { Consejo } from '../../../models/Consejo.model'
import { eliminarConsejo } from '../../../lib/services/consejos.services'
import { RootState } from '../../../redux/store'
import { setHasModified } from '../../../redux/consejo'

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
    navigation.navigate('AgregarConsejo', { consejo })
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
      style={tw`absolute top-6 right-4 bg-white z-40 py-1 rounded-lg shadow-md w-28`}
    >
      <Pressable
        onPress={changeScreen}
        onBlur={() => setDisplay(false)}
        onPressOut={() => setDisplay(false)}
        onTouchEnd={() => setDisplay(false)}
      >
        <View style={tw`flex flex-row items-center py-2 px-6`}>
          <Image
            source={require('../../../assets/edit_blue_icon.png')}
            style={{ width: 12, height: 12, marginRight: 8 }}
          />
          <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-semibold text-sm`}>
            Editar
          </Text>
        </View>
      </Pressable>
      <Ruler style="w-11/12 mx-auto" />
      <Pressable onPress={deleteConsejo}>
        <View style={tw`flex flex-row items-center py-2  px-6 `}>
          <Image
            source={require('../../../assets/bin_icon.png')}
            style={{ width: 12, height: 12, marginRight: 8 }}
          />
          <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-semibold text-sm`}>
            Eliminar
          </Text>
        </View>
      </Pressable>
    </View>
  )
}

export default ConsejosOpcionesMenu
