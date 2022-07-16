import * as React from 'react'
import { Text, View, Image, Pressable } from 'react-native'
import tw from 'twrnc'
import { CustomText } from '../../atomos/CustomText'
import TarjetaTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import { TEXT_COLORS } from '../../../utils/constants'
import LinkedBadges from '../../moleculas/LinkedBadges'
import AdditionalMediaIcon from '../../atomos/AdditionalMediaIcon'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../../models/Screens.types'

const badges = [
  {
    value: 'peligro',
    label: 'Peligro',
  },
  {
    value: 'celebraciones',
    label: 'Celebraciones',
  },
  {
    value: 'recomendaciones',
    label: 'Recomendaciones',
  },
  {
    value: 'salud',
    label: 'Salud',
  },
]

const TarjetaPublicaciones = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
  return (
    <Pressable onPress={() => navigation.navigate('DetallePublicacion')}>
      <TarjetaTemplate shadow={false}>
        <View style={tw`pt-2 pb-8 relative`}>
          <CustomText style={`${TEXT_COLORS.DARK_BLUE}`}>
            Descuento en repuestos
          </CustomText>
          <View style={tw`py-3 flex flex-row`}>
            <View style={tw`w-3/12`}>
              <Image
                source={require('../../../../assets/repuestos.png')}
                style={{ width: 80, height: 80, borderRadius: 40 / 2 }}
              />
            </View>
            <View style={tw`w-10/12 pr-3`}>
              <LinkedBadges badges={badges} />
              <View style={tw`pl-4 pr-4 pt-1`}>
                <Text numberOfLines={2}>
                  Se venden repuestos semi-nuevos para bicicleta, pueden
                  acercarse a cualquier sucursal de las que se muestran en esta
                  publicacion
                </Text>
              </View>
              <View style={tw`self-end pr-6 pt-2`}>
                <AdditionalMediaIcon />
              </View>
            </View>
          </View>

          <View style={tw`absolute bottom-0 right-2`}>
            <Text style={tw`${TEXT_COLORS.DARK_GRAY}`}>
              José - 9 Dic. 2021 08:00{' '}
            </Text>
          </View>
        </View>
      </TarjetaTemplate>
    </Pressable>
  )
}

export default TarjetaPublicaciones
