import React from 'react'
import { Text, View } from 'react-native'
import tw from 'twrnc'

const Navbar = () => {
  return (
    <View style={tw`flex h-full`}>
      <Text style={tw`text-[#F16F31] font-bold text-xl mt-4`}>
        ECUA
        <Text style={tw`text-white`}>CICLISMO</Text>
      </Text>
    </View>
  )
}

export default Navbar
