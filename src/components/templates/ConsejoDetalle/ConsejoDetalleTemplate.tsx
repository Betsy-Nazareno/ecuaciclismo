import { NavigationProp, useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { Text, View, Image, ImageSourcePropType } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'twrnc'
import { republicarConsejo } from '../../../lib/services/consejos.services'
import { Consejo } from '../../../models/Consejo.model'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import { setHasModified } from '../../../redux/consejo'
import { RootState } from '../../../redux/store'
import {
  BACKGROUND_COLORS,
  TEXT_COLORS,
  WIDTH_DIMENSIONS,
} from '../../../utils/constants'
import ButtonPrimary from '../../atomos/ButtonPrimary'
import InformacionUsuario from '../../atomos/InformacionUsuario'
import Spinner from '../../atomos/Spinner'
import AdminValidator from '../AdminValidator'
import ContenedorPaginasDetalle from '../ContenedorPaginasDetalle'

interface ConsejoDetalleProps {
  consejo: Consejo
}

const ConsejoDetalleTemplate = ({ consejo }: ConsejoDetalleProps) => {
  const { authToken } = useSelector((state: RootState) => state.sesion)
  const { hasModified } = useSelector((state: RootState) => state.consejo)
  const [isLoading, setIsLoading] = React.useState(false)
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
  const dispatch = useDispatch()

  const handleRepublicar = async () => {
    setIsLoading(true)
    if (authToken && consejo.token) {
      await republicarConsejo(authToken, consejo.token)
    }
    setIsLoading(false)
    dispatch(setHasModified({ hasModified: !hasModified }))
    navigation.navigate('Inicio')
  }
  return (
    <View style={tw`px-2 pb-4`}>
      <ContenedorPaginasDetalle
        borderRight
        colorBorder="#6a7cd4"
        borderWidth={12}
      >
        <View style={tw`relative`}>
          <InformacionUsuario
            firstName={consejo?.first_name || ''}
            lastName={consejo?.last_name || ''}
            foto={consejo?.foto}
          />
        </View>

        <View style={tw`mx-auto`}>
          {consejo.imagen ? (
            <Image
              source={{ uri: consejo.imagen } as ImageSourcePropType}
              style={{
                width: WIDTH_DIMENSIONS * 0.8,
                height: 200,
                borderRadius: 20 / 2,
              }}
            />
          ) : null}
        </View>

        <View style={tw`pt-4 pb-4 px-2`}>
          <Text style={tw`${TEXT_COLORS.DARK_BLUE} text-sm`}>
            {consejo.informacion}
          </Text>
        </View>

        <AdminValidator>
          {isLoading ? (
            <Spinner />
          ) : (
            <View>
              <ButtonPrimary
                label="Republicar"
                handleClick={handleRepublicar}
                style={`${BACKGROUND_COLORS.SKY_BLUE} mt-6 mb-3 w-5/12 mx-auto py-2 rounded-2xl`}
              />
            </View>
          )}
        </AdminValidator>
      </ContenedorPaginasDetalle>
    </View>
  )
}

export default ConsejoDetalleTemplate
