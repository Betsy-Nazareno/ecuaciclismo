import * as React from 'react'
import { View } from 'react-native'
import tw from 'twrnc'

interface GapProps {
  styles?: string
  px?: string
  py?: string
  children: React.ReactNode | React.ReactNode[]
}

const Gap = ({ styles, px, py, children }: GapProps) => {
  return (
    <View
      style={tw`${px ? `px-${px}` : ''} ${styles || ''} ${
        py ? `py-${py}` : ''
      }`}
    >
      {children}
    </View>
  )
}

export default Gap
