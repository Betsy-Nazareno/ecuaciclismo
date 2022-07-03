import { NavigationProp, useNavigation } from '@react-navigation/native'
import * as React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  ImageSourcePropType,
} from 'react-native'
import { useSelector } from 'react-redux'
import tw from 'twrnc'
import { eliminarConsejo } from '../../../lib/services/consejos.services'
import { Consejo } from '../../../models/Consejo.model'
import {
  RootDrawerParamList,
  ScreensDrawer,
} from '../../../models/Screens.types'
import { RootState } from '../../../redux/store'
import { BACKGROUND_COLORS, TEXT_COLORS } from '../../../utils/constants'
import ButtonPrimary from '../atomos/ButtonPrimary'
import InformacionUsuario from '../atomos/InformacionUsuario'
import AdminValidator from '../templates/AdminValidator'
import ContenedorPaginasDetalle from '../templates/ContenedorPaginasDetalle'

interface ConsejoDetalleProps {
  consejo: Consejo
}

const ConsejoDetalleTemplate = ({ consejo }: ConsejoDetalleProps) => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const navigation =
    useNavigation<NavigationProp<RootDrawerParamList, ScreensDrawer>>()

  const deleteConsejo = async () => {
    consejo.token &&
      (await eliminarConsejo(authToken as string, consejo.token as string))
    navigation.navigate('Consejos')
  }

  return (
    <View style={tw`px-2`}>
      <ContenedorPaginasDetalle
        borderRight
        colorBorder="#6a7cd4"
        borderWidth={12}
      >
        <View style={tw`relative`}>
          <InformacionUsuario
            firstName={consejo?.first_name || ''}
            lastName={consejo?.last_name || ''}
          />
          <AdminValidator stylesProp="absolute top-2 right-2">
            <Pressable onPress={deleteConsejo}>
              <Image
                source={require('../../../assets/bin_icon.png')}
                style={{ width: 20, height: 20, marginRight: 8 }}
              />
            </Pressable>
          </AdminValidator>
        </View>

        <View style={tw`mx-auto`}>
          {consejo.imagen ? (
            <Image
              source={{ uri: consejo.imagen } as ImageSourcePropType}
              style={{ width: 200, height: 200 }}
            />
          ) : null}
        </View>

        <View style={tw`pt-8 pb-4 px-2`}>
          <Text style={tw`${TEXT_COLORS.DARK_BLUE} text-sm`}>
            {consejo.informacion}
          </Text>
        </View>

        <AdminValidator>
          <View>
            <ButtonPrimary
              label="Republicar"
              handleClick={() => {
                return
              }}
              style={`${BACKGROUND_COLORS.SKY_BLUE} mt-6 mb-3 w-5/12 mx-auto`}
            />
          </View>
        </AdminValidator>
      </ContenedorPaginasDetalle>
    </View>
  )
}

export default ConsejoDetalleTemplate
