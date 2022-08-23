import * as React from 'react'
import { Image, Text } from 'react-native'
import Gap from '../../atomos/Gap'
import TitleWithDivider from '../../moleculas/TitleWithDivider'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'

interface RutaPuntosEncuentroProps {
  grupos: any[]
}

const RutaPuntosEncuentro = ({ grupos }: RutaPuntosEncuentroProps) => {
  return (
    <RoundedWhiteBaseTemplate shadow={false}>
      <TitleWithDivider label="Puntos de encuentro" />
      {grupos?.map((grupo, index) => (
        <Gap py="1" styles="flex flex-row items-center" key={index}>
          <Image
            source={require('../../../../assets/grupos_ubicacion_icon.png')}
            style={{ width: 30, height: 30, marginRight: 8 }}
          />
          <Text>
            {grupo.nombre}
            {': '} {grupo.lugar_encuentro}
          </Text>
        </Gap>
      ))}
    </RoundedWhiteBaseTemplate>
  )
}

export default RutaPuntosEncuentro
