import * as React from 'react'
import { View } from 'react-native'
import tw from 'twrnc'
import { BACKGROUND_COLORS, BORDER_COLORS } from '../../utils/constants'

const EmptyTarjetaContacto = () => {
  return (
    <View
      style={tw`bg-white py-3 border-r-8 ${BORDER_COLORS.ORANGE} border-solid z-40`}
    >
      <View style={tw`flex flex-row pl-2`}>
        <View style={tw`pl-4`}>
          <View style={tw`w-16 h-16 rounded-lg ${BACKGROUND_COLORS.GRAY} `} />
        </View>
        <View style={tw`pl-6`}>
          <View style={tw`w-64 h-3 rounded-xl ${BACKGROUND_COLORS.GRAY}`} />
          <View
            style={tw`my-2 w-52 h-3 rounded-xl ${BACKGROUND_COLORS.GRAY}`}
          />
          <View style={tw`w-36 h-3 rounded-xl ${BACKGROUND_COLORS.GRAY}`} />
        </View>
      </View>
    </View>
  )
}

export default EmptyTarjetaContacto
