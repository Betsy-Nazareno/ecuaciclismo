import * as React from 'react'
import { Button, View } from 'react-native'
import tw from 'twrnc'
import { useAuthentication } from '../../../hooks/useAuthentication'
// import { useAuthentication } from '../../../hooks/useAuthentication'
import { BACKGROUND_COLORS } from '../../../utils/constants'
import Ruler from '../../atomos/Ruler'
import PerfilFotoHeader from './PerfilFotoHeader'
import PerfilInformacionBicicleta from './PerfilInformacionBicicleta'
import PerfilInformacionPersonal from './PerfilInformacionPersonal'
import PerfilRutasInteres from './PerfilRutasInteres'
import PerfilRutasRecorridas from './PerfilRutasRecorridas'

const PerfilRoot = () => {
  const { deleteUserStore } = useAuthentication()
  return (
    <View style={tw`pb-12`}>
      <PerfilFotoHeader />
      <Ruler style={`w-11/12 mx-auto ${BACKGROUND_COLORS.GRAY} my-4`} />

      <PerfilInformacionPersonal />
      <Ruler style={`w-11/12 mx-auto ${BACKGROUND_COLORS.GRAY} my-4`} />

      <PerfilInformacionBicicleta />
      <Ruler style={`w-11/12 mx-auto ${BACKGROUND_COLORS.GRAY} my-4`} />

      <PerfilRutasInteres />
      <Ruler style={`w-11/12 mx-auto ${BACKGROUND_COLORS.GRAY} my-4`} />

      <PerfilRutasRecorridas />
      <Ruler style={`w-11/12 mx-auto ${BACKGROUND_COLORS.GRAY} my-4`} />

      <View style={tw`w-8/12 mx-auto`}>
        <Button title="Cerrar sesion" onPress={deleteUserStore}></Button>
      </View>
    </View>
  )
}

export default PerfilRoot
