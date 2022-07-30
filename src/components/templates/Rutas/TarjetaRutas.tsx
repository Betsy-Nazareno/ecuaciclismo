import * as React from 'react'
import tw from 'twrnc'
import { Text, View, Image, Pressable } from 'react-native'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import { CustomText } from '../../atomos/CustomText'
import { BACKGROUND_COLORS, TEXT_COLORS } from '../../../utils/constants'
import Gap from '../../atomos/Gap'
import Badge from '../../moleculas/Badge'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../../models/Screens.types'

const TarjetaRutas = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
  return (
    <RoundedWhiteBaseTemplate shadow={false}>
      <Pressable onPress={() => navigation.navigate('DetalleRuta')}>
        <View style={tw`flex flex-row items-center py-2 relative`}>
          <View>
            <Image
              source={require('../../../../assets/rutaImage.png')}
              style={{ width: 100, height: 100, borderRadius: 20 / 2 }}
            />
          </View>

          <View style={tw`pl-5 pt-2`}>
            <CustomText style={`${TEXT_COLORS.DARK_BLUE}`}>Salinas</CustomText>
            <Gap py="1">
              <Text style={tw`${TEXT_COLORS.DARK_BLUE}`}>
                @ Malecón de Salinas
              </Text>
              <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-semibold`}>
                06/02/2022 07:00 AM
              </Text>
            </Gap>
            <Text style={tw`${TEXT_COLORS.GREEN_PRIMARY}`}>
              Nivel Intermedio
            </Text>
          </View>

          <View style={tw`absolute top-0 right-0`}>
            <Badge
              label="Inscrito"
              name="inscrito"
              stylesProp="px-6 py-0"
              backgroundColor={BACKGROUND_COLORS.GREEN_PRIMARY}
            />
          </View>
        </View>
      </Pressable>
    </RoundedWhiteBaseTemplate>
  )
}

export default TarjetaRutas
