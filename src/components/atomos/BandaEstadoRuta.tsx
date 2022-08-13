import * as React from 'react'
import tw from 'twrnc'
import { Text, View } from 'react-native'

interface BandaEstadoRutaProps {
  color: string
  estado: string
  styles?: string
}

const BandaEstadoRuta = ({
  color,
  estado,
  styles = '',
}: BandaEstadoRutaProps) => {
  return (
    <View
      style={[
        tw`absolute top-4 -right-6 ${color} px-6 ${styles}`,
        { transform: [{ rotate: '40deg' }] },
      ]}
    >
      <Text style={tw`text-white font-semibold text-xs text-center`}>
        {estado}
      </Text>
    </View>
  )
}

export default BandaEstadoRuta
