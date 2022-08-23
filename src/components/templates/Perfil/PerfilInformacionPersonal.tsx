import * as React from 'react'
import { View } from 'react-native'
import tw from 'twrnc'
import Gap from '../../atomos/Gap'
import RowWithImage from '../../atomos/RowWithImage'

interface Props {
  edad: number | string
  peso: number | string
  nivel: string
  genero: string
}

const PerfilInformacionPersonal = ({ edad, peso, nivel, genero }: Props) => {
  return (
    <View style={tw`w-10/12 mx-auto flex flex-row`}>
      <View style={tw`w-6/12`}>
        <Gap py="2">
          <RowWithImage
            icon={require('../../../../assets/age_icon.png')}
            text={`${edad} años`}
          />
        </Gap>
        <Gap py="2">
          <RowWithImage
            icon={require('../../../../assets/peso.png')}
            text={`${peso} kg`}
          />
        </Gap>
      </View>
      <View style={tw`w-6/12`}>
        <Gap py="2">
          <RowWithImage
            icon={require('../../../../assets/hembra.png')}
            text={genero}
          />
        </Gap>

        <Gap py="2">
          <RowWithImage
            icon={require('../../../../assets/level_icon.png')}
            text={nivel}
          />
        </Gap>
      </View>
    </View>
  )
}

export default PerfilInformacionPersonal
