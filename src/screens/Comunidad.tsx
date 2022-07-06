import * as React from 'react'
import { Image, View } from 'react-native'
import tw from 'twrnc'

const Comunidad = () => {
  return (
    <View style={tw`mx-auto mt-[30%]`}>
      <Image
        source={require('../../assets/wip3.png')}
        style={{ width: 256, height: 256 }}
      />
    </View>
  )
}

export default Comunidad
