import * as React from 'react'
import tw from 'twrnc'
import { Image, Text, View } from 'react-native'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import TitleWithDivider from '../../moleculas/TitleWithDivider'
import { catalogoRequisitos } from '../../../utils/constants'
import Gap from '../../atomos/Gap'

const RutasRequisitos = () => {
  return (
    <RoundedWhiteBaseTemplate shadow={false}>
      <TitleWithDivider label="Requisitos" />
      <View style={tw`px-1 py-2`}>
        {catalogoRequisitos.map((requisito, index) => (
          <Gap py="1" styles="flex flex-row items-center" key={index}>
            <Image
              source={require('../../../../assets/check_filled_icon.png')}
              style={{ width: 15, height: 15, marginRight: 8 }}
            />
            <Text>{requisito.nombre}</Text>
          </Gap>
        ))}
      </View>
    </RoundedWhiteBaseTemplate>
  )
}

export default RutasRequisitos
