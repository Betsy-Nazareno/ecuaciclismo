import * as React from 'react'
import tw from 'twrnc'
import { View, Pressable, Image } from 'react-native'
import { CustomText } from './CustomText'
import { TEXT_COLORS } from '../../utils/constants'
import Ruler from './Ruler'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../models/Screens.types'

interface OpcionesAgregarContactoSeguroProps {
  setDisplay: (value: boolean) => void
}

const OpcionesAgregarContactoSeguro = ({
  setDisplay,
}: OpcionesAgregarContactoSeguroProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList, Screens>>()

  return (
    <View
      style={tw`absolute top-13 right-1 bg-white z-40 rounded-lg shadow-md w-52 justify-center items-center`}
    >
        <Pressable
          onPress={() => navigation.navigate('ContactosComunidad')}
          onBlur={() => setDisplay(false)}
          onPressOut={() => setDisplay(false)}
          onTouchEnd={() => setDisplay(false)}
          style={tw`pt-2 pb-2`}
        >
            <CustomText style={`${TEXT_COLORS.DARK_BLUE} font-semibold text-sm`}>
                Agregar desde comunidad
            </CustomText>
        </Pressable>
        <Ruler style="w-11/12 mx-auto" />
        <Pressable onPress={() => navigation.navigate('ContactosCelular')} style={tw`pt-2 pb-2`}>
            <CustomText style={`${TEXT_COLORS.DARK_BLUE} font-semibold text-sm`}>
                Agregar desde su celular
            </CustomText>
        </Pressable>
    </View>
  )
}

export default OpcionesAgregarContactoSeguro
