import * as React from 'react'
import tw from 'twrnc'
import { View } from 'react-native'
import HeaderRoundedContainer from '../moleculas/HeaderRoundedContainer'
import { BACKGROUND_COLORS } from '../../utils/constants'
import RoundedWhiteBaseTemplate from './RoundedWhiteBaseTemplate'

const EmptyDetalleRuta = () => {
  return (
    <View style={tw`mx-2`}>
      <HeaderRoundedContainer>
        <View
          style={tw`w-10/12 h-4 rounded-lg ${BACKGROUND_COLORS.GRAY} mx-auto`}
        />
        <View style={tw`flex flex-row my-4 pl-8 pb-8`}>
          <View
            style={tw`w-2/12 h-4 rounded-lg mr-2 ${BACKGROUND_COLORS.GRAY}`}
          />
          <View
            style={tw`w-2/12 h-4 rounded-lg mr-2 ${BACKGROUND_COLORS.GRAY}`}
          />
          <View
            style={tw`w-2/12 h-4 rounded-lg mr-2 ${BACKGROUND_COLORS.GRAY}`}
          />
        </View>
      </HeaderRoundedContainer>

      <RoundedWhiteBaseTemplate shadow={false}>
        <View style={tw`w-full h-[30rem] rounded-lg mr-2 mt-6`}>
          <View
            style={tw`w-full h-24 rounded-lg mr-2 ${BACKGROUND_COLORS.GRAY_PLACEHOLDER}`}
          />

          <View
            style={tw`w-10/12 mt-4 h-4 rounded-lg ${BACKGROUND_COLORS.GRAY} mx-auto`}
          />
          <View
            style={tw`w-4/12 mt-4 h-4 rounded-lg ${BACKGROUND_COLORS.GRAY} mx-auto`}
          />
          <View
            style={tw`w-10/12 mt-4 h-4 rounded-lg ${BACKGROUND_COLORS.GRAY} mx-auto`}
          />
          <View
            style={tw`w-4/12 mt-4 h-4 rounded-lg ${BACKGROUND_COLORS.GRAY} `}
          />
          <View
            style={tw`w-4/12 mt-4 h-4 rounded-lg ${BACKGROUND_COLORS.GRAY} `}
          />
          <View
            style={tw`w-9/12 mt-4 h-4 rounded-lg ${BACKGROUND_COLORS.GRAY} `}
          />

          <View
            style={tw`w-full h-24 rounded-lg mr-2 mt-8 ${BACKGROUND_COLORS.GRAY_PLACEHOLDER}`}
          />
        </View>
      </RoundedWhiteBaseTemplate>
    </View>
  )
}

export default EmptyDetalleRuta
