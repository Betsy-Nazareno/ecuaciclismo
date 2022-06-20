import * as React from 'react'
import { ScrollView } from 'react-native'
import tw from 'twrnc'

interface Props {
  children: React.ReactNode
}

const BaseAutenticacion = ({ children }: Props) => {
  return <ScrollView style={tw`mt-[15%] px-6`}>{children}</ScrollView>
}

export default BaseAutenticacion
