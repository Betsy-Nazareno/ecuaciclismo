import * as React from 'react'
import tw from 'twrnc'
import { View } from 'react-native'
import RutasFeedHeader from './RutasFeedHeader'
import TarjetaRutas from './TarjetaRutas'

const RutasFeed = () => {
  return (
    <View style={tw`px-2`}>
      <RutasFeedHeader />
      <View style={tw`py-2`}>
        <TarjetaRutas />
        <TarjetaRutas />
        <TarjetaRutas />
        <TarjetaRutas />
        <TarjetaRutas />
      </View>
    </View>
  )
}

export default RutasFeed
