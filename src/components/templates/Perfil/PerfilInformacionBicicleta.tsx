import * as React from 'react'
import tw from 'twrnc'
import { View, Image, Text } from 'react-native'
import { CustomText } from '../../atomos/CustomText'
import { TEXT_COLORS, WIDTH_DIMENSIONS } from '../../../utils/constants'
import ItemLi from '../../atomos/ItemLi'
import Gap from '../../atomos/Gap'

interface Props {
  tipo?: string
  marca?: string
  codigo?: string
  foto?: string
}

const PerfilInformacionBicicleta = ({ tipo, marca, codigo, foto }: Props) => {
  return (
    <View style={tw`mx-4 mt-2`}>
      <CustomText style={TEXT_COLORS.PRIMARY_BLUE}>
        Modelo de bicicleta
      </CustomText>
      <View style={tw`flex flex-row flex-wrap items-center mt-6 mb-2`}>
        {!foto && !marca && !codigo && !tipo ? (
          <Text style={tw`text-black text-opacity-40`}>
            No haz añadido información de tu bicicleta en el perfil
          </Text>
        ) : null}

        <View style={tw`w-6/12`}>
          {foto ? (
            <Image
              source={{ uri: foto }}
              style={{ width: WIDTH_DIMENSIONS * 0.4, height: 100 }}
              resizeMode="contain"
            />
          ) : null}
        </View>
        <View style={tw`w-6/12`}>
          {tipo ? (
            <Gap py="1">
              <ItemLi text={tipo} />
            </Gap>
          ) : null}
          {marca ? (
            <Gap py="1">
              <ItemLi text={marca} />
            </Gap>
          ) : null}
          {codigo ? (
            <Gap py="1">
              <ItemLi text={codigo} />
            </Gap>
          ) : null}
        </View>
      </View>
    </View>
  )
}

export default PerfilInformacionBicicleta
