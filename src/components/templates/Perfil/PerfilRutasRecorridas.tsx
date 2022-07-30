import * as React from 'react'
import { View } from 'react-native'
import tw from 'twrnc'
import { TEXT_COLORS } from '../../../utils/constants'
import { CustomText } from '../../atomos/CustomText'
import Gap from '../../atomos/Gap'
import RutaRecorrida from '../../moleculas/RutaRecorrida'

const PerfilRutasRecorridas = () => {
  return (
    <View style={tw`mx-12 mt-2`}>
      <CustomText style={TEXT_COLORS.PRIMARY_BLUE}>Mis Rutas</CustomText>

      <View style={tw`flex flex-row flex-wrap items-center mt-3`}>
        <Gap px="[1px]" py="[1px]" styles="w-1/3 h-24">
          <RutaRecorrida icon={require('../../../../assets/rutaa1.png')} />
        </Gap>
        <Gap px="[1px]" py="[1px]" styles="w-1/3 h-24">
          <RutaRecorrida icon={require('../../../../assets/rutaa2.png')} />
        </Gap>

        <Gap px="[1px]" py="[1px]" styles="w-1/3 h-24">
          <RutaRecorrida icon={require('../../../../assets/rutaa3.png')} />
        </Gap>

        <Gap px="[1px]" py="[1px]" styles="w-1/3 h-24">
          <RutaRecorrida icon={require('../../../../assets/rutaa2.png')} />
        </Gap>
      </View>
    </View>
  )
}

export default PerfilRutasRecorridas
