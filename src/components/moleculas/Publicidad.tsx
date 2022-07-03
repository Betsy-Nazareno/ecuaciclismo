import { NavigationProp, useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { Text, View, Image, Pressable } from 'react-native'
import tw from 'twrnc'
import { PublicidadInterface } from '../../../models/Publicidad.model'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import { BORDER_COLORS, TEXT_COLORS } from '../../../utils/constants'
import ButtonUnderline from '../atomos/ButtonUnderline'

interface PublicidadProps {
  data: PublicidadInterface
}

const Publicidad = ({ data }: PublicidadProps) => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
  return (
    <Pressable
      onPress={() => navigation.navigate('DetallePublicidad', { data })}
    >
      <View
        style={tw`bg-white py-3 border-r-8 ${BORDER_COLORS.ORANGE} border-solid z-40`}
      >
        <View style={tw`flex flex-row pl-2`}>
          <View style={tw`pl-4`}>
            <Image source={data.imagen} style={{ width: 60, height: 60 }} />
          </View>
          <View style={tw`pl-6`}>
            <Text style={tw`text-base font-bold ${TEXT_COLORS.PRIMARY_BLUE}`}>
              {data.titulo}
            </Text>
            <Text style={tw`text-sm font-semibold ${TEXT_COLORS.DARK_GRAY}`}>
              {data.descripcion_corta}
            </Text>
            <ButtonUnderline
              label="Click Aquí!"
              handleClick={() => {
                return
              }}
              style={TEXT_COLORS.ORANGE}
            />
          </View>
        </View>
      </View>
    </Pressable>
  )
}

export default Publicidad
