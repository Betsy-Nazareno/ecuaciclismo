import * as React from 'react'
import { Text, View } from 'react-native'
import tw from 'twrnc'
interface TransparentBadgeProps {
  label: string
  styles?: string
}

const TransparentBadge = ({ label, styles = '' }: TransparentBadgeProps) => {
  return (
    <View
      style={tw`rounded-3xl py-1 pl-2 pr-3 flex flex-row items-center h-7 border-2 border-solid border-gray-100 border-opacity-20 bg-opacity-20 bg-black ${styles}`}
    >
      <Text style={tw`text-white text-xs font-semibold`}>
        {label}
      </Text>
    </View>
  )
}

export default TransparentBadge
