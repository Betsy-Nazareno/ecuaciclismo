import * as React from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import tw from 'twrnc'
import Badge from '../atomos/Badge'

const BarraFiltros = () => {
  return (
    <ScrollView
      horizontal
      style={tw`my-2 py-4 mx-4 flex flex-row overflow-hidden`}
    >
      <View style={tw`px-1`}>
        <Badge text="Fecha" />
      </View>
      <View style={tw`px-1`}>
        <Badge text="Peligro" />
      </View>
      <View style={tw`px-1`}>
        <Badge text="Kudos" />
      </View>
      <View style={tw`px-1`}>
        <Badge text="Recomendaciones" />
      </View>
      <View style={tw`px-1`}>
        <Badge text="Salud" />
      </View>
    </ScrollView>
  )
}

export default BarraFiltros
