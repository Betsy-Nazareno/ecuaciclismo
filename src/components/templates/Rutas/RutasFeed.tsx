import * as React from 'react'
import tw from 'twrnc'
import { View } from 'react-native'
import RutasFeedHeader from './RutasFeedHeader'
import TarjetaRutas from './TarjetaRutas'

const RutasFeed = () => {
  return (
    <View style={tw`px-2`}>
      <RutasFeedHeader />
      <View style={tw`py-2`}>
        <TarjetaRutas estado="En Curso" inscrito />
        <TarjetaRutas estado="En Curso" />
        <TarjetaRutas estado="Disponible" inscrito />
        <TarjetaRutas estado="Disponible" />
        <TarjetaRutas estado="Sin Cupos" />
        <TarjetaRutas estado="Sin Cupos" />
        <TarjetaRutas estado="Finalizada" />
        <TarjetaRutas estado="Finalizada" />
        <TarjetaRutas estado="Finalizada" />
        <TarjetaRutas estado="Cancelada" />
      </View>
    </View>
  )
}

export default RutasFeed
