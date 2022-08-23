import * as React from 'react'
import tw from 'twrnc'
import { Image, Switch, Text, View } from 'react-native'
import { CustomText } from '../../atomos/CustomText'
import { TEXT_COLORS } from '../../../utils/constants'
import Gap from '../../atomos/Gap'
import { capitalize } from '../../../utils/capitalizeText'
import AdminValidator from '../AdminValidator'
import { cambiarPermiso } from '../../../lib/services/user.services'
import { DatosBasicosUser } from './ComunidadAndRoles'

interface TarjetaUsuarioProps {
  usuario: DatosBasicosUser
  authToken: string
}

const TarjetaUsuario = ({ usuario, authToken }: TarjetaUsuarioProps) => {
  const [admin, setAdmin] = React.useState(!!usuario.admin)

  const changeRole = async (value: boolean) => {
    if (authToken) {
      await cambiarPermiso(usuario.token_usuario, value, authToken)
      setAdmin(value)
    }
  }
  return (
    <View
      style={tw`bg-white rounded-xl w-full my-1 py-2 flex flex-row justify-between`}
    >
      <View style={tw`flex flex-row items-center`}>
        <Image
          source={
            usuario.foto
              ? { uri: usuario.foto }
              : require('../../../../assets/user.png')
          }
          style={{
            width: 60,
            height: 60,
            borderRadius: 400 / 2,
          }}
          resizeMode="contain"
        />
        <Gap px="4">
          <CustomText style={`${TEXT_COLORS.DARK_BLUE}`}>
            {capitalize(usuario.first_name)} {capitalize(usuario.last_name)}
          </CustomText>
        </Gap>
      </View>
      <AdminValidator>
        {admin ? (
          <Text style={tw`text-xs text-black text-opacity-40`}>Admin</Text>
        ) : null}
        <Switch
          trackColor={{ false: '#e6e6e6', true: '#81b0ff' }}
          thumbColor="#3FA1EE"
          onValueChange={changeRole}
          value={admin}
        />
      </AdminValidator>
    </View>
  )
}

export default TarjetaUsuario
