import * as React from 'react'
import tw from 'twrnc'
import { View, Image, Pressable } from 'react-native'
import OpcionesMenu from '../atomos/OpcionesMenu'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../models/Screens.types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { setPublicacionHasModified } from '../../redux/publicacion'
import { eliminarPublicacion } from '../../lib/services/publicaciones.services'

const MenuPublicaciones = () => {
  const publicacion = { token: '' }
  const [displayMenu, setDisplayMenu] = React.useState(false)
  //   const [canEdit, setCanEdit] = React.useState(false)
  const { authToken } = useSelector((state: RootState) => state.user)
  const { publicacionHasModified } = useSelector(
    (state: RootState) => state.publicacion
  )
  const dispatch = useDispatch()
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()

  React.useEffect(() => {
    //if() publicacion.usuario===authToken => setCanEdit
  }, [])

  const handleEdit = () => {
    navigation.navigate('PublicacionFormulario') //Enviar publicacion
    setDisplayMenu(false)
  }

  const handleDelete = async () => {
    dispatch(
      setPublicacionHasModified({
        publicacionHasModified: !publicacionHasModified,
      })
    )
    if (publicacion.token && authToken) {
      await eliminarPublicacion(authToken, publicacion.token)
    }
    setDisplayMenu(false)
  }

  return (
    <View style={tw`z-40`}>
      <Pressable onPress={() => setDisplayMenu(!displayMenu)}>
        <Image
          source={require('../../../assets/menu_icon.png')}
          style={{ width: 25, height: 25 }}
        />
      </Pressable>
      {displayMenu && (
        <OpcionesMenu
          setDisplay={setDisplayMenu}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </View>
  )
}

export default MenuPublicaciones
