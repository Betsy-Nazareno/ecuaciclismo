import * as React from 'react'
import { View } from 'react-native'
import tw from 'twrnc'
import Gap from '../../atomos/Gap'
import RowWithImage from '../../atomos/RowWithImage'

const PerfilInformacionPersonal = () => {
  return (
    <View style={tw`w-9/12 mx-auto`}>
      <Gap py="2">
        <RowWithImage
          icon={require('../../../../assets/email_icon.png')}
          text="lmiranda@gmail.com"
        />
      </Gap>

      <Gap py="2">
        <RowWithImage
          icon={require('../../../../assets/telephone_icon.png')}
          text="0962762972"
        />
      </Gap>

      <Gap py="2">
        <RowWithImage
          icon={require('../../../../assets/party_icon.png')}
          text="07/04/2000"
        />
      </Gap>

      <Gap py="2">
        <RowWithImage
          icon={require('../../../../assets/level_icon.png')}
          text="Nivel Principiante"
        />
      </Gap>
    </View>
  )
}

export default PerfilInformacionPersonal
