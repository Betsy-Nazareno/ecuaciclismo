import * as React from 'react'
import tw from 'twrnc'
import { Image, Pressable, Switch, Text, View } from 'react-native'
import { CustomText } from '../../atomos/CustomText'
import { TEXT_COLORS } from '../../../utils/constants'
import Gap from '../../atomos/Gap'
import { capitalize } from '../../../utils/capitalizeText'
import AdminValidator from '../AdminValidator'
import { cambiarPermiso } from '../../../lib/services/user.services'
import { DatosBasicosUser } from './ComunidadAndRoles'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../../models/Screens.types'

interface TarjetaUsuarioProps {
  usuario: DatosBasicosUser
}

const TarjetaUsuario = ({ usuario }: TarjetaUsuarioProps) => {
  const [admin, setAdmin] = React.useState(!!usuario.admin)
  const { authToken } = useSelector((state: RootState) => state.sesion)
  const { user } = useSelector((state: RootState) => state.user)
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()

  const changeRole = async (value: boolean) => {
    if (authToken) {
      await cambiarPermiso(usuario.token_usuario, value, authToken)
      setAdmin(value)
    }
  }

  const handlePress = () => {
    if (!user?.admin) return
    navigation.navigate('Perfil', { userToken: usuario.token_usuario })
  }
  return (
    <Pressable
      style={tw`bg-white rounded-xl w-full my-1 py-2 flex flex-row justify-between`}
      onPress={handlePress}
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
    </Pressable>
  )
}

export default TarjetaUsuario
