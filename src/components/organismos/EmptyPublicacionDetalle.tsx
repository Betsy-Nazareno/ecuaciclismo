import * as React from 'react'
import tw from 'twrnc'
import { View } from 'react-native'
import RoundedWhiteBaseTemplate from './RoundedWhiteBaseTemplate'
import { BACKGROUND_COLORS } from '../../utils/constants'

const EmptyPublicacionDetalle = () => {
  return (
    <View style={tw`p-2`}>
      <RoundedWhiteBaseTemplate shadow={false}>
        <View
          style={tw`pl-12 w-11/12 mx-auto h-4 rounded-xl ${BACKGROUND_COLORS.GRAY}`}
        />
        <View style={tw`flex flex-row mt-4`}>
          <View style={tw`w-14 h-14 rounded-full ${BACKGROUND_COLORS.GRAY}`} />
          <View style={tw`w-full`}>
            <View
              style={tw`ml-8 w-8/12 h-4 rounded-xl ${BACKGROUND_COLORS.GRAY}`}
            />
            <View
              style={tw`ml-8 mt-2 w-4/12 h-4 rounded-xl ${BACKGROUND_COLORS.GRAY}`}
            />
          </View>
        </View>

        <View
          style={tw`w-full mt-4 h-64 rounded-lg ${BACKGROUND_COLORS.GRAY}`}
        />
        <View
          style={tw`mt-4 w-full h-4 rounded-xl ${BACKGROUND_COLORS.GRAY}`}
        />
      </RoundedWhiteBaseTemplate>

      <RoundedWhiteBaseTemplate shadow={false}>
        <View style={tw`flex flex-row mt-4`}>
          <View style={tw`w-14 h-14 rounded-full ${BACKGROUND_COLORS.GRAY}`} />
          <View style={tw`w-full`}>
            <View
              style={tw`ml-8 w-8/12 h-4 rounded-xl ${BACKGROUND_COLORS.GRAY}`}
            />
            <View
              style={tw`ml-8 mt-2 w-4/12 h-4 rounded-xl ${BACKGROUND_COLORS.GRAY}`}
            />
          </View>
        </View>
      </RoundedWhiteBaseTemplate>
    </View>
  )
}

export default EmptyPublicacionDetalle
