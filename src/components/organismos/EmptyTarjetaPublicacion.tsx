import * as React from 'react'
import tw from 'twrnc'
import { View } from 'react-native'
import RoundedWhiteBaseTemplate from './RoundedWhiteBaseTemplate'
import { BACKGROUND_COLORS } from '../../utils/constants'

const EmptyTarjetaPublicacion = () => {
  return (
    <RoundedWhiteBaseTemplate shadow={false}>
      <View style={tw`pl-12 w-64 h-3 rounded-xl ${BACKGROUND_COLORS.GRAY}`} />
      <View style={tw`flex flex-row mt-4`}>
        <View
          style={tw`pl-12 w-24 h-24 rounded-xl ${BACKGROUND_COLORS.GRAY}`}
        />
        <View style={tw`ml-6`}>
          <View style={tw`flex flex-row`}>
            <View style={tw`w-16 h-4 rounded-xl ${BACKGROUND_COLORS.GRAY}`} />
            <View
              style={tw`ml-2 w-16 h-4 rounded-xl ${BACKGROUND_COLORS.GRAY}`}
            />
            <View
              style={tw`ml-2 w-16 h-4 rounded-xl ${BACKGROUND_COLORS.GRAY}`}
            />
          </View>
          <View
            style={tw`mt-4 w-52 h-3 rounded-xl ${BACKGROUND_COLORS.GRAY}`}
          />
          <View
            style={tw`mt-4 w-52 h-3 rounded-xl ${BACKGROUND_COLORS.GRAY}`}
          />
        </View>
      </View>
    </RoundedWhiteBaseTemplate>
  )
}

export default EmptyTarjetaPublicacion
