import * as React from 'react'
import tw from 'twrnc'
import { View, Image } from 'react-native'
import { CustomText } from '../../atomos/CustomText'
import { TEXT_COLORS, WIDTH_DIMENSIONS } from '../../../utils/constants'
import ItemLi from '../../atomos/ItemLi'
import Gap from '../../atomos/Gap'

const PerfilInformacionBicicleta = () => {
  return (
    <View style={tw`mx-4 mt-2`}>
      <CustomText style={TEXT_COLORS.PRIMARY_BLUE}>
        Modelo de bicicleta
      </CustomText>
      <View style={tw`flex flex-row flex-wrap items-center mt-6 mb-2`}>
        <View style={tw`w-6/12 `}>
          <Image
            source={require('../../../../assets/bicicletaa.png')}
            style={{ width: WIDTH_DIMENSIONS * 0.4, height: 100 }}
            resizeMode="contain"
          />
        </View>
        <View style={tw`w-6/12`}>
          <Gap py="1">
            <ItemLi text="Bicicleta tipo X" />
          </Gap>
          <Gap py="1">
            <ItemLi text="Marca X " />
          </Gap>
          <Gap py="1">
            <ItemLi text="Código GPT" />
          </Gap>
        </View>
      </View>
    </View>
  )
}

export default PerfilInformacionBicicleta
