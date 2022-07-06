import React, { ReactNode } from 'react'
import tw from 'twrnc'
import { ScrollView, StatusBar, View } from 'react-native'
import { BACKGROUND_COLORS } from '../../../utils/constants'

interface Props {
  children: ReactNode | ReactNode[]
}

const BaseDrawerPaginas = ({ children }: Props) => {
  return (
    <View style={tw`relative h-full ${BACKGROUND_COLORS.BLUE_LIGHTER}`}>
      <StatusBar backgroundColor={'#2D84C4'} />
      <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
    </View>
  )
}

export default BaseDrawerPaginas
