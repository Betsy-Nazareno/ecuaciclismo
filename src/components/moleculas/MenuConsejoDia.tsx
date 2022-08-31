import * as React from 'react'
import { View, Pressable, Image } from 'react-native'
import { Consejo } from '../../models/Consejo.model'
import ConsejosOpcionesMenu from '../atomos/OpcionesMenu'
import AdminValidator from '../templates/AdminValidator'
import tw from 'twrnc'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../models/Screens.types'
import { setHasModified } from '../../redux/consejo'
import {
  despinnearConsejo,
  eliminarConsejo,
  pinnearConsejo,
} from '../../lib/services/consejos.services'

interface MenuConsejoDiaProps {
  consejo: Consejo
}

const MenuConsejoDia = ({ consejo }: MenuConsejoDiaProps) => {
  const [displayMenu, setDisplayMenu] = React.useState(false)
  const { authToken } = useSelector((state: RootState) => state.sesion)
  const { hasModified } = useSelector((state: RootState) => state.consejo)
  const dispatch = useDispatch()
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()

  const changeScreen = () => {
    navigation.navigate('ConsejoFormulario', { consejo })
    setDisplayMenu(false)
  }

  const deleteConsejo = async () => {
    dispatch(setHasModified({ hasModified: !hasModified }))
    if (consejo.token && authToken) {
      await eliminarConsejo(authToken, consejo.token)
    }
    setDisplayMenu(false)
  }

  const handlePin = async () => {
    const { token } = consejo
    if (authToken && token) {
      if (consejo.fijado) {
        await despinnearConsejo(token, authToken)
      } else {
        await pinnearConsejo(token, authToken)
      }
    }
    dispatch(setHasModified({ hasModified: !hasModified }))
  }

  return (
    <AdminValidator>
      <Pressable onPress={() => setDisplayMenu(!displayMenu)}>
        <View style={tw`mt-2 w-6 -mr-2 z-40`}>
          <Image
            source={require('../../../assets/menu_icon.png')}
            style={{ height: 20, width: 12 }}
          />
        </View>
      </Pressable>
      {displayMenu && (
        <ConsejosOpcionesMenu
          handleEdit={changeScreen}
          handleDelete={deleteConsejo}
          handlePin={handlePin}
          pinLabel={consejo.fijado ? 'Desfijar' : 'Fijar'}
        />
      )}
    </AdminValidator>
  )
}

export default MenuConsejoDia
