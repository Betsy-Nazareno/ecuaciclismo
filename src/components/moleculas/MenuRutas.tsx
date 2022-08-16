import * as React from 'react'
import tw from 'twrnc'
import { Image, Pressable, View } from 'react-native'
import { Ruta } from '../../models/Rutas'
import AdminValidator from '../templates/AdminValidator'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import OpcionesMenuRutas from '../atomos/OpcionesMenuRutas'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../models/Screens.types'
import { setRutaHasModified } from '../../redux/ruta'
import { cancelarRutas } from '../../lib/services/rutas.services'
import RutaCancelarModal from '../organismos/RutaCancelarModal'

interface MenuRutasProps {
  ruta: Ruta
}

const MenuRutas = ({ ruta }: MenuRutasProps) => {
  const [motivo, setMotivo] = React.useState('')
  const [displayMenu, setDisplayMenu] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const { authToken } = useSelector((state: RootState) => state.user)
  const { rutaHasModified } = useSelector((state: RootState) => state.ruta)
  const dispatch = useDispatch()
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()

  const changeScreen = () => {
    navigation.navigate('RutasFormulario', { ruta })
    setDisplayMenu(false)
  }

  const cancelarRuta = async () => {
    dispatch(setRutaHasModified({ rutaHasModified: !rutaHasModified }))
    if (ruta.token && authToken) {
      await cancelarRutas(authToken, ruta.token, motivo)
    }
    setDisplayMenu(false)
  }

  return (
    <AdminValidator>
      {showModal ? (
        <RutaCancelarModal
          visible={showModal}
          setVisible={setShowModal}
          motivo={motivo}
          setMotivo={setMotivo}
          handleConfirmation={cancelarRuta}
        />
      ) : null}
      <Pressable onPress={() => setDisplayMenu(!displayMenu)}>
        <View style={tw`mt-2 w-6 -mr-2`}>
          <Image
            source={require('../../../assets/menu_icon.png')}
            style={{ height: 20, width: 12 }}
          />
        </View>
      </Pressable>
      {displayMenu && (
        <OpcionesMenuRutas
          handleEdit={changeScreen}
          handleCancelar={() => setShowModal(true)}
        />
      )}
    </AdminValidator>
  )
}

export default MenuRutas
