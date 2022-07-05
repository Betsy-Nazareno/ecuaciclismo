import * as React from 'react'
import { Image, Text, View } from 'react-native'
import tw from 'twrnc'
import { TEXT_COLORS } from '../../../utils/constants'

interface InformacionUsuarioProps {
  firstName: string
  lastName: string
}

const InformacionUsuario = ({
  firstName,
  lastName,
}: InformacionUsuarioProps) => {
  return (
    <View style={tw`flex flex-row pb-2`}>
      <Image
        source={require('../../../assets/user.png')}
        style={{ width: 40, height: 45, borderRadius: 400 / 2 }}
      />
      <View style={tw`ml-[4%] mt-[1%]`}>
        <Text
          style={tw`text-base ${TEXT_COLORS.DARK_BLUE} font-semibold capitalize`}
        >
          {`${firstName} ${lastName}`}
        </Text>
        <Text style={tw`text-[11px] ${TEXT_COLORS.DARK_GRAY} font-semibold`}>
          Administrador
        </Text>
      </View>
    </View>
  )
}

export default InformacionUsuario
