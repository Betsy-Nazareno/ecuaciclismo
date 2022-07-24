import * as React from 'react'
import tw from 'twrnc'
import { View } from 'react-native'
import RutasFeedHeader from './RutasFeedHeader'

const RutasFeed = () => {
  return (
    <View style={tw`px-2`}>
      <RutasFeedHeader />
      <View style={tw`py-2`}></View>
    </View>
  )
}

export default RutasFeed
