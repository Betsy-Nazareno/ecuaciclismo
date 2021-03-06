import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { ScrollView } from 'react-native'
import tw from 'twrnc'

interface Props {
  children: React.ReactNode
}

const BaseAutenticacion = ({ children }: Props) => {
  return (
    <ScrollView style={tw`px-6`}>
      <StatusBar backgroundColor={'#fff'} />
      {children}
    </ScrollView>
  )
}

export default BaseAutenticacion
