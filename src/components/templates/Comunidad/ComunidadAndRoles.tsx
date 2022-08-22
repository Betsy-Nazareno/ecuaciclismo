import * as React from 'react'
import tw from 'twrnc'
import { ScrollView } from 'react-native'
import SectionTitle from '../../moleculas/SectionTitle'
import ListaComunidad from './ListaComunidad'

const ComunidadAndRoles = () => {
  return (
    <ScrollView style={tw`px-2 py-4`}>
      <SectionTitle text="Comunidad" />
      <ListaComunidad />
    </ScrollView>
  )
}

export default ComunidadAndRoles
