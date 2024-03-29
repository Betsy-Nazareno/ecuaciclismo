import { NavigationProp, useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { Text, View, Image, Pressable, ImageSourcePropType } from 'react-native'
import tw from 'twrnc'
import { NovedadInterface } from '../../../models/Novedad.model'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import { BORDER_COLORS, TEXT_COLORS } from '../../../utils/constants'
import ButtonUnderline from '../../atomos/ButtonUnderline'

interface NovedadProps {
  data: NovedadInterface
}

const Novedad = ({ data }: NovedadProps) => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
  return (
    <Pressable onPress={() => navigation.navigate('DetalleNovedad', { data })}>
      <View
        style={tw`bg-white py-3 border-r-8 ${BORDER_COLORS.ORANGE} border-solid z-40`}
      >
        <View style={tw`flex flex-row pl-2`}>
          <View style={tw`pl-4`}>
            <Image
              source={{ uri: data.imagen } as ImageSourcePropType}
              style={{ width: 70, height: 70, borderRadius: 20 / 2 }}
            />
          </View>
          <View style={[tw`pl-4 w-8/12 overflow-hidden`]}>
            <Text
              style={tw`text-base font-bold ${TEXT_COLORS.PRIMARY_BLUE}`}
              numberOfLines={1}
            >
              {data.titulo}
            </Text>

            <Text
              style={tw`text-sm font-semibold ${TEXT_COLORS.DARK_GRAY}`}
              numberOfLines={1}
            >
              {data.descripcion_corta}
            </Text>
            <ButtonUnderline
              label="Click Aquí!"
              handleClick={() => {
                return
              }}
              style={`${TEXT_COLORS.ORANGE} pt-2`}
            />
          </View>
        </View>
      </View>
    </Pressable>
  )
}

export default Novedad
