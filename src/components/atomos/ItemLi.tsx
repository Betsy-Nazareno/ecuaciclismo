import * as React from 'react'
import tw from 'twrnc'
import { Text, View } from 'react-native'
import { BACKGROUND_COLORS, TEXT_COLORS } from '../../utils/constants'

interface ItemLiProps {
  text: string
}

const ItemLi = ({ text }: ItemLiProps) => {
  return (
    <View style={tw`flex flex-row flex-wrap items-center`}>
      <View
        style={tw`w-2 h-2 rounded-full mr-2 ${BACKGROUND_COLORS.DARK_BLUE}`}
      />
      <Text style={tw`${TEXT_COLORS.DARK_BLUE}`}>{text}</Text>
    </View>
  )
}

export default ItemLi
