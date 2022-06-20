import * as React from 'react'
import { Image, Text, View } from 'react-native'
import tw from 'twrnc'
import { User } from '../../../models/User'
import { TEXT_COLORS } from '../../../utils/constants'
import Ruler from './Ruler'

interface InformacionUsuarioProps {
  user: User
  description: string
}

const InformacionUsuario = ({ user, description }: InformacionUsuarioProps) => {
  return (
    <>
      <View style={tw`flex flex-row pb-2`}>
        <Image
          source={require('../../../assets/photo2.jpg')}
          style={{ width: 40, height: 45, borderRadius: 400 / 2 }}
        />
        <View style={tw`ml-[4%] mt-[1%]`}>
          <Text style={tw`text-base ${TEXT_COLORS.DARK_BLUE} font-semibold`}>
            {`${user.first_name} ${user.last_name}`}
          </Text>
          <Text style={tw`text-[11px] ${TEXT_COLORS.DARK_GRAY} font-semibold`}>
            {description}
          </Text>
        </View>
      </View>
      <Ruler style="w-full bg-gray-200" />
    </>
  )
}

export default InformacionUsuario
