import React from 'react'
import { Image, Text, View } from 'react-native'
import BasePaginas from '../components/templates/BasePaginas'
import tw from 'twrnc'
import { TEXT_COLORS } from '../../utils/constants'
const Publicaciones = () => {
  return (
    <BasePaginas>
      <View style={tw`mx-auto mt-[30%]`}>
        <Text
          style={tw`text-center font-bold text-3xl ${TEXT_COLORS.DARK_GRAY}`}
        >
          Publicaciones
        </Text>
        <Image
          source={require('../../assets/wip3.png')}
          style={{ width: 256, height: 256 }}
        />
      </View>
    </BasePaginas>
  )
}

export default Publicaciones
