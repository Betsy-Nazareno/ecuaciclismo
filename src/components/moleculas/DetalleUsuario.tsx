import * as React from 'react'
import { Image, Text, View } from 'react-native'
import tw from 'twrnc'
import { TEXT_COLORS } from '../../utils/constants'

interface DetalleUsuarioProps {
  hasDate?: boolean
  fecha?: string
  nombre: string
}

const DetalleUsuario = ({
  hasDate = true,
  nombre,
  fecha,
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
          style={tw`text-base font-semibold capitalize ${TEXT_COLORS.DARK_BLUE}`}
        >
          {nombre}
        </Text>
        {hasDate && (
          <Text style={tw`text-xs capitalize ${TEXT_COLORS.DARK_GRAY}`}>
            {fecha}
          </Text>
        )}
      </View>
    </View>
  )
}

export default DetalleUsuario
