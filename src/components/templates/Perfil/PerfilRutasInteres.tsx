import * as React from 'react'
import tw from 'twrnc'
import { View } from 'react-native'
import { CustomText } from '../../atomos/CustomText'
import { TEXT_COLORS } from '../../../utils/constants'
import Gap from '../../atomos/Gap'
import RoundedBadge from '../../moleculas/RoundedBadge'

const PerfilRutasInteres = () => {
  return (
    <View style={tw`mx-12 mt-2`}>
      <CustomText style={TEXT_COLORS.PRIMARY_BLUE}>Rutas de Interés</CustomText>
      <View style={tw`flex flex-row flex-wrap mt-4`}>
        <Gap px="1" py="1">
          <RoundedBadge label="Montaña" />
        </Gap>

        <Gap px="1" py="1">
          <RoundedBadge label="Ciclopaseo" />
        </Gap>

        <Gap px="1" py="1">
          <RoundedBadge label="Extrema" />
        </Gap>
      </View>
    </View>
  )
}

export default PerfilRutasInteres
