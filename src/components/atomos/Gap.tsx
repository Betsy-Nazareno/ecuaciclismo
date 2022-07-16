import * as React from 'react'
import { View } from 'react-native'
import tw from 'twrnc'

interface GapProps {
  styles?: string
  px: string
  children: React.ReactNode | React.ReactNode[]
}

const Gap = ({ styles, px, children }: GapProps) => {
  return <View style={tw`px-${px} ${styles || ''}`}>{children}</View>
}

export default Gap
