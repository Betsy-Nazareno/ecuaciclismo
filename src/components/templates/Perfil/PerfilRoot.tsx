import { NavigationProp, useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'twrnc'
import { useAuthentication } from '../../../hooks/useAuthentication'
import {
  getDetalleUsuario,
  updateUser,
} from '../../../lib/services/user.services'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import { User } from '../../../models/User'
import { RootState } from '../../../redux/store'
import { BACKGROUND_COLORS } from '../../../utils/constants'
import * as SecureStore from 'expo-secure-store'
import Ruler from '../../atomos/Ruler'
import OpcionPerfil from '../../moleculas/OpcionPerfil'
import PerfilFotoHeader from './PerfilFotoHeader'
import PerfilInformacionBicicleta from './PerfilInformacionBicicleta'
import PerfilInformacionPersonal from './PerfilInformacionPersonal'
import PerfilRutasInteres from './PerfilRutasInteres'
import PerfilRutasRecorridas from './PerfilRutasRecorridas'
import UserValidator from '../UserValidator'
import { actualizarUsuario } from '../../../redux/user'

interface PerfilRootProps {
  userToken: string
}

const PerfilRoot = ({ userToken }: PerfilRootProps) => {
  const { deleteUserStore } = useAuthentication()
  const { authToken, refreshUser } = useSelector(
    (state: RootState) => state.user
  )
  const [hasRefresh, setHasRefresh] = React.useState(false)
  const [detalleUser, setDetalleUser] = React.useState<Partial<User>>({})
  const dispatch = useDispatch()
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()

  React.useEffect(() => {
    ;(async () => {
      if (authToken) {
        const detalle = await getDetalleUsuario(authToken, userToken)
        setDetalleUser(detalle)
      }
    })()
  }, [userToken, hasRefresh, refreshUser])

  const handleUpdates = async (updatedFields: Partial<User>) => {
    const data = { ...detalleUser, ...updatedFields }

    await updateUser(userToken, data)
    const result = await SecureStore.getItemAsync('user')
    if (result) {
      const data = JSON.parse(result)
      await SecureStore.setItemAsync(
        'user',
        JSON.stringify({
          token: data.token,
          user: { ...data.user, foto: updatedFields.foto },
        })
      )
    }
    setHasRefresh(!hasRefresh)
  }

  return (
    <View style={tw`pb-12`}>
      <PerfilFotoHeader
        isAdmin={!!detalleUser?.admin}
        nombre={detalleUser?.first_name}
        apellido={detalleUser?.last_name}
        email={detalleUser?.email}
        foto={detalleUser?.foto}
        telefono={detalleUser?.telefono}
        onUpdate={handleUpdates}
        idUser={userToken}
      />
      <Ruler style={`w-11/12 mx-auto ${BACKGROUND_COLORS.GRAY} my-4`} />

      <PerfilInformacionPersonal
        edad={detalleUser?.edad || '_'}
        nivel={detalleUser?.nivel || 'Nivel Básico'}
        peso={detalleUser?.peso || '_'}
        genero={detalleUser?.genero || '_ Género'}
      />
      <Ruler style={`w-11/12 mx-auto ${BACKGROUND_COLORS.GRAY} my-4`} />

      <PerfilRutasInteres tipoRutas={detalleUser?.etiquetas} />
      <Ruler style={`w-11/12 mx-auto ${BACKGROUND_COLORS.GRAY} my-4`} />

      <PerfilInformacionBicicleta
        tipo={detalleUser?.tipo}
        marca={detalleUser?.marca}
        codigo={detalleUser?.codigo}
        foto={detalleUser?.foto_bicicleta}
      />

      <Ruler style={`w-11/12 mx-auto ${BACKGROUND_COLORS.GRAY} my-4`} />

      <PerfilRutasRecorridas rutas={detalleUser?.rutas} userToken={userToken} />
      <Ruler style={`${BACKGROUND_COLORS.GRAY} mt-4`} />

      <UserValidator userToken={userToken}>
        <View style={tw`w-full pl-4`}>
          <OpcionPerfil
            icon={require('../../../../assets/chevron-abajo.png')}
            handlePress={() =>
              navigation.navigate('PerfilFormulario', { data: detalleUser })
            }
            text="Editar datos del perfil"
            transform
          />

          <Ruler style={`-ml-4 ${BACKGROUND_COLORS.GRAY}`} />

          <OpcionPerfil
            icon={require('../../../../assets/logout.png')}
            handlePress={() => deleteUserStore()}
            text="Cerrar sesión"
          />

          <Ruler style={`-ml-4 ${BACKGROUND_COLORS.GRAY}`} />
        </View>
      </UserValidator>
    </View>
  )
}

export default PerfilRoot
