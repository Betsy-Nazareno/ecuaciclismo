import * as React from 'react'
import SelectUsers from '../components/templates/RegistroVerificado/SelectUsers'
import { StatusBar, View } from 'react-native'
import tw from 'twrnc'
import { BACKGROUND_COLORS } from '../utils/constants'

const SeleccionarUsers = () => {
  return (
    <>
      <View
        style={tw`relative h-full ${ BACKGROUND_COLORS.BLUE_LIGHTER}`}
      >
        <StatusBar backgroundColor={'#2D84C4'} />
        <SelectUsers />
      </View>
    </>
  )
}
  
export default SeleccionarUsers