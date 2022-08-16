import * as React from 'react'
import tw from 'twrnc'
import { Text, View, StyleSheet, Image } from 'react-native'
import TitleWithDivider from '../../moleculas/TitleWithDivider'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import { TEXT_COLORS } from '../../../utils/constants'

interface RutaDescripcionProps {
  descripcion: string
}

const RutaDescripcion = ({ descripcion }: RutaDescripcionProps) => {
  return (
    <RoundedWhiteBaseTemplate shadow={false}>
      <TitleWithDivider label="Descripción del evento" />

      <Text style={tw`my-2 ${TEXT_COLORS.DARK_BLUE}`}>{descripcion}</Text>
    </RoundedWhiteBaseTemplate>
  )
}

export default RutaDescripcion
