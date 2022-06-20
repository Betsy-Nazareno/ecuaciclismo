import * as React from 'react'
import { View } from 'react-native'
import tw from 'twrnc'

interface Prop {
  style: string
}

const Ruler = ({ style }: Prop) => {
  return <View style={tw`h-[1px] bg-gray-400 ${style}`} />
}

export default Ruler
