import * as React from 'react'
import { Text, View, Image } from 'react-native'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import tw from 'twrnc'
import VerticalDivider from '../../atomos/VerticalDivider'
import { TEXT_COLORS } from '../../../utils/constants'

const TarjetaComentarioPublicacion = () => {
  return (
    <RoundedWhiteBaseTemplate shadow={false}>
      <View style={tw`flex flex-row items-center`}>
        <View style={tw`relative px-2 w-2/12 `}>
          <View style={tw`z-40 py-4`}>
            <Image
              source={require('../../../../assets/user.png')}
              style={{ width: 40, height: 45, borderRadius: 400 / 2 }}
            />
          </View>
          <VerticalDivider />
        </View>

        <View style={tw`relative px-2 pr-12 `}>
          <Text
            style={tw`text-sm font-semibold capitalize ${TEXT_COLORS.DARK_BLUE}`}
          >
            José Delgado
          </Text>

          <Text style={tw`text-sm`}>
            La presente declaración de uno de nuestros miembros de la comunidad
          </Text>
        </View>
      </View>
    </RoundedWhiteBaseTemplate>
  )
}

export default TarjetaComentarioPublicacion
