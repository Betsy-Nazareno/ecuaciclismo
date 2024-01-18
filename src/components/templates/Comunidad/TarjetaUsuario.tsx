import * as React from 'react'
import tw from 'twrnc'
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CustomText } from '../../atomos/CustomText'
import { TEXT_COLORS, imagesRoutes } from '../../../utils/constants'
import Gap from '../../atomos/Gap'
import { capitalize } from '../../../utils/capitalizeText'
import AdminValidator from '../AdminValidator'
import { cambiarPermiso } from '../../../lib/services/user.services'
import { DatosBasicosUser } from './ComunidadAndRoles'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootDrawerParamList, ScreensDrawer } from '../../../models/Screens.types'
import Ruler from '../../atomos/Ruler'

interface TarjetaUsuarioProps {
  usuario: DatosBasicosUser
}

const TarjetaUsuario = ({ usuario }: TarjetaUsuarioProps) => {
  const [admin, setAdmin] = React.useState(!!usuario.admin)
  const { authToken, user } = useSelector((state: RootState) => state.user)
  const navigation =
    useNavigation<NavigationProp<RootDrawerParamList, ScreensDrawer>>()
  const [menuVisible, setMenuVisible] = React.useState(false);
  const changeRole = async (value: boolean) => {
    if (authToken) {
      await cambiarPermiso(usuario.token_usuario, value, authToken)
      setAdmin(value)
    }
  }
  const showMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handlePress = () => {
    if (!user?.admin) return
    navigation.navigate('Perfil', { userToken: usuario.token_usuario })
  }

  const labels: string[] = Object.keys(imagesRoutes)
  let indx = 0
  const label: string = usuario.tipo ?? ''
  while (indx < labels.length && label != labels[indx]) { indx++ }
  let val
  (indx >= labels.length) ?
    (val = require("../../../../assets/failed.png")) : (val = Object.values(imagesRoutes)[indx])

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
          <View style={tw`flex flex-row items-center`}>
            <CustomText style={`${TEXT_COLORS.DARK_BLUE}`}>
              {capitalize(usuario.first_name)} {capitalize(usuario.last_name)}
            </CustomText>
            <View style={{ paddingLeft: 9 }}>
              {admin ? (
                <Image
                  source={require('../../../../assets/admin.png')}
                  style={{ width: 20, height: 20 }}
                />
              ) : (label !== 'No verificado' && label !== '') ? (
                <Image
                  source={val}
                  style={{ width: 20, height: 20 }}
                />
              ) : null}
            </View>
          </View>
          {admin ?
            (<Text style={tw`text-xs text-black text-opacity-40`}>Administrador</Text>)
            : (<Text style={tw`text-xs text-black text-opacity-40`}>{label}</Text>)
          }
        </Gap>

      </View>
      <AdminValidator>
        <TouchableOpacity onPress={showMenu}>
          <Image source={require('../../../../assets/menu_icon.png')} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>


      </AdminValidator>
      {/* Menú emergente */}
      {menuVisible && (
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuOption}>
            <Text>Opción 1 fgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdf</Text>
          </TouchableOpacity>
          <Ruler style="w-11/12 mx-auto" />
          <TouchableOpacity style={styles.menuOption}>
            <Text>Opción 2 dfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgfdgdf</Text>
          </TouchableOpacity>
        </View>
      )}
      {
        /*
        <Switch
        trackColor={{ false: '#e6e6e6', true: '#81b0ff' }}
        thumbColor="#3FA1EE"
        onValueChange={changeRole}
        value={admin}
      />
        */
      }

    </Pressable>
  )
}
const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    width: 250,
    padding: 8,
    elevation: 10,
    zIndex: 1,
  },
  menuOption: {
    paddingVertical: 8,
    zIndex: 2,
    paddingHorizontal: 12,

  },
});
export default TarjetaUsuario
