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
import { Publicacion } from '../../models/Publicaciones.model'
import ConfirmationModal from '../organismos/ConfirmationModal'

interface MenuPublicacionesProps {
  userToken: string
  publicacion: Publicacion
}

const MenuPublicaciones = ({ publicacion }: MenuPublicacionesProps) => {
  const [displayMenu, setDisplayMenu] = React.useState(false)
  const [canEdit, setCanEdit] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [confirmationDelete, setConfirmationDelete] = React.useState(false)
  const { authToken } = useSelector((state: RootState) => state.user)
  const { publicacionHasModified } = useSelector(
    (state: RootState) => state.publicacion
  )
  const dispatch = useDispatch()
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()

  React.useEffect(() => {
    setCanEdit(publicacion.token_usuario === authToken)
  }, [publicacion])

  React.useEffect(() => {
    ;(async () => {
      if (confirmationDelete) {
        dispatch(
          setPublicacionHasModified({
            publicacionHasModified: !publicacionHasModified,
          })
        )
        if (publicacion.token && authToken) {
          await eliminarPublicacion(authToken, publicacion.token)
        }
        setDisplayMenu(false)
        navigation.navigate('Publicaciones')
      }
    })()
  }, [confirmationDelete])

  const handleEdit = () => {
    navigation.navigate('PublicacionFormulario', { data: publicacion }) //Enviar publicacion
    setDisplayMenu(false)
  }

  const handleDelete = async () => {
    setShowModal(true)
  }

  return (
    <>
      <ConfirmationModal
        setVisible={setShowModal}
        visible={showModal}
        title={'Eliminar Publicación'}
        body="¿Estás seguro que deseas eliminar esta publicación?"
        setConfirmation={setConfirmationDelete}
      />
      <View style={tw`z-40`}>
        <Pressable onPress={() => setDisplayMenu(!displayMenu)}>
          <Image
            source={require('../../../assets/menu_icon.png')}
            style={{ width: 20, height: 20 }}
          />
        </Pressable>
        {displayMenu && (
          <OpcionesMenu
            setDisplay={setDisplayMenu}
            canEdit={canEdit}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </View>
    </>
  )
}

export default MenuPublicaciones
