import * as React from 'react'
import { Text, View, Image, ImageSourcePropType, Pressable } from 'react-native'
import ContenedorPaginasDetalle from '../templates/ContenedorPaginasDetalle'
import tw from 'twrnc'
import { TEXT_COLORS, WIDTH_DIMENSIONS } from '../../../utils/constants'
import Ruler from '../atomos/Ruler'
import { PublicidadInterface } from '../../../models/Publicidad.model'
import { useDispatch, useSelector } from 'react-redux'
import { setNovedadHasModified } from '../../../redux/novedad'
import { RootState } from '../../../redux/store'
import { eliminarNovedad } from '../../../lib/services/novedades.services'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import {
  RootDrawerParamList,
  ScreensDrawer,
} from '../../../models/Screens.types'
import AdminValidator from '../templates/AdminValidator'
import Spinner from '../atomos/Spinner'

interface PublicidadIndividualProps {
  data: PublicidadInterface
}

const PublicidadIndividual = ({ data }: PublicidadIndividualProps) => {
  const { nombre, celular, direccion } = data || {}
  const { authToken } = useSelector((state: RootState) => state.user)
  const [isLoading, setIsLoading] = React.useState(false)
  const { novedadHasModified } = useSelector(
    (state: RootState) => state.novedad
  )
  const navigation =
    useNavigation<NavigationProp<RootDrawerParamList, ScreensDrawer>>()
  const dispatch = useDispatch()

  const handleDelete = async () => {
    setIsLoading(true)
    dispatch(setNovedadHasModified({ novedadHasModified: !novedadHasModified }))
    data.token &&
      (await eliminarNovedad(authToken as string, data.token as string))
    navigation.navigate('Novedades')
    setIsLoading(false)
  }

  return (
    <View style={tw`mx-2 relative `}>
      <ContenedorPaginasDetalle
        borderRight
        colorBorder="#F16F31"
        borderWidth={12}
        styleProps="py-6"
      >
        <View style={tw`pb-24`}>
          <AdminValidator>
            <Pressable onPress={handleDelete}>
              <View style={tw`self-end`}>
                <Image
                  source={require('../../../assets/bin_icon.png')}
                  style={{ width: 24, height: 24, marginRight: 8 }}
                />
              </View>
            </Pressable>
          </AdminValidator>
          <Text
            style={tw`text-2xl font-bold text-center ${TEXT_COLORS.DARK_BLUE}`}
          >
            {data.titulo || ''}
          </Text>

          <View style={tw`mx-auto pt-6 pb-4`}>
            <View style={tw`mx-auto`}>
              <Image
                source={{ uri: data.imagen } as ImageSourcePropType}
                style={{
                  width: WIDTH_DIMENSIONS * 0.8,
                  height: 250,
                  borderRadius: 20 / 2,
                }}
              />
            </View>
          </View>
          <View style={tw`w-10/12 mx-auto pt-4 pb-4`}>
            <Text style={tw`text-base`}>{data.descripcion || ''}</Text>
          </View>

          {(nombre || celular || direccion) && (
            <>
              <Ruler style="w-11/12 mx-auto bg-gray-200 mb-4" />

              <View style={tw`w-10/12 mx-auto`}>
                <Text style={tw`text-lg font-bold ${TEXT_COLORS.PRIMARY_BLUE}`}>
                  Datos de contacto
                </Text>

                {nombre && (
                  <View style={tw`pt-2`}>
                    <Text style={tw`text-sm`}>Nombre: {nombre}</Text>
                  </View>
                )}

                {celular && (
                  <View style={tw`pt-2`}>
                    <Text style={tw`text-sm`}>
                      Celular: {data.celular || ''}
                    </Text>
                  </View>
                )}

                {direccion && (
                  <View style={tw`pt-2`}>
                    <Text style={tw`text-sm`}>
                      Dirección: {data.direccion || ''}
                    </Text>
                  </View>
                )}
              </View>
            </>
          )}

          {isLoading && <Spinner />}

          <View style={tw`absolute bottom-0 left-6`}>
            <Text style={tw`text-xs ${TEXT_COLORS.DARK_GRAY}`}>
              Novedad auspiciada por la comunidad{' '}
              <Text style={tw`font-bold`}>Ecuaciclismo</Text>
            </Text>
          </View>
        </View>
      </ContenedorPaginasDetalle>
    </View>
  )
}

export default PublicidadIndividual
