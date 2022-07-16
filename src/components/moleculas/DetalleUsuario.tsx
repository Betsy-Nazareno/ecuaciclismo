import * as React from 'react'
import { Image, Text, View } from 'react-native'
import tw from 'twrnc'
import { TEXT_COLORS } from '../../utils/constants'

interface DetalleUsuarioProps {
  hasRole?: boolean
  hasDate?: boolean
}

const DetalleUsuario = ({
  hasRole = true,
  hasDate = true,
}: DetalleUsuarioProps) => {
  return (
    <View style={tw`flex flex-row items-center`}>
      <View style={tw`mr-4`}>
        <Image
          source={require('../../../assets/user.png')}
          style={{ width: 40, height: 45, borderRadius: 400 / 2 }}
        />
      </View>

      <View>
        <Text
          style={tw`text-sm font-semibold capitalize ${TEXT_COLORS.DARK_BLUE}`}
        >
          José Delgado {hasRole ? '- Ciclista' : ''}
        </Text>
        {hasDate && (
          <Text style={tw`text-xs capitalize ${TEXT_COLORS.DARK_GRAY}`}>
            12 Dic. 2021 14:00
          </Text>
        )}
      </View>
    </View>
  )
}

export default DetalleUsuario
