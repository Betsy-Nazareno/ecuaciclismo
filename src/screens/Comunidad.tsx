import * as React from 'react'
import tw from 'twrnc'
import { View } from 'react-native'
import ComunidadAndRoles from '../components/templates/Comunidad/ComunidadAndRoles'
import { BACKGROUND_COLORS } from '../utils/constants'
import { StatusBar } from 'expo-status-bar'

const Comunidad = () => {
  return (
    <View style={tw`relative h-full ${BACKGROUND_COLORS.BLUE_LIGHTER}`}>
      <StatusBar backgroundColor={'#2D84C4'} />
      <ComunidadAndRoles />
    </View>
  )
}

export default Comunidad
