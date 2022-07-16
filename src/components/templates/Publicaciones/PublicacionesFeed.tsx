import * as React from 'react'
import { View } from 'react-native'
import tw from 'twrnc'
import PublicacionesFeedHeader from './PublicacionesFeedHeader'
import TarjetaPublicaciones from './TarjetaPublicaciones'

const PublicacionesFeed = () => {
  return (
    <View style={tw`px-2`}>
      <PublicacionesFeedHeader />
      <View style={tw`py-2`}>
        <TarjetaPublicaciones />
        <TarjetaPublicaciones />
        <TarjetaPublicaciones />
        <TarjetaPublicaciones />
        <TarjetaPublicaciones />
        <TarjetaPublicaciones />
      </View>
    </View>
  )
}

export default PublicacionesFeed
