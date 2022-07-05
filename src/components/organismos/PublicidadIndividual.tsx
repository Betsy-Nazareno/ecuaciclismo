import * as React from 'react'
import { Text, View, Image, ImageSourcePropType } from 'react-native'
import ContenedorPaginasDetalle from '../templates/ContenedorPaginasDetalle'
import tw from 'twrnc'
import { TEXT_COLORS, WIDTH_DIMENSIONS } from '../../../utils/constants'
import Ruler from '../atomos/Ruler'
import { PublicidadInterface } from '../../../models/Publicidad.model'

interface PublicidadIndividualProps {
  data: PublicidadInterface
}

const PublicidadIndividual = ({ data }: PublicidadIndividualProps) => {
  const { nombre, celular, direccion } = data.datos_contacto || {}
  return (
    <View style={tw`mx-2 relative `}>
      <ContenedorPaginasDetalle
        borderRight
        colorBorder="#F16F31"
        borderWidth={12}
      >
        <View style={tw`pb-24 relative`}>
          <Text
            style={tw`text-2xl font-bold text-center ${TEXT_COLORS.DARK_BLUE}`}
          >
            {data.titulo || ''}
          </Text>
          <View style={tw`mx-auto py-3`}>
            <View style={tw`mx-auto`}>
              <Image
                source={{ uri: data.imagen } as ImageSourcePropType}
                style={{
                  width: WIDTH_DIMENSIONS * 0.8,
                  height: 200,
                  borderRadius: 20 / 2,
                }}
              />
            </View>
          </View>
          <View style={tw`w-10/12 mx-auto pt-4 pb-4`}>
            <Text style={tw`text-base`}>{data.descripcion || ''}</Text>
          </View>

          <Ruler style="w-11/12 mx-auto bg-gray-200 mb-4" />

          <View style={tw`w-10/12 mx-auto`}>
            {(nombre || celular || direccion) && (
              <Text style={tw`text-lg font-bold ${TEXT_COLORS.PRIMARY_BLUE}`}>
                Datos de contacto
              </Text>
            )}

            {nombre && (
              <View style={tw`pt-2`}>
                <Text style={tw`text-sm`}>Nombre: {nombre}</Text>
              </View>
            )}

            {celular && (
              <View style={tw`pt-2`}>
                <Text style={tw`text-sm`}>
                  Celular: {data.datos_contacto?.celular || ''}
                </Text>
              </View>
            )}

            {direccion && (
              <View style={tw`pt-2`}>
                <Text style={tw`text-sm`}>
                  Dirección: {data.datos_contacto?.direccion || ''}
                </Text>
              </View>
            )}
          </View>

          <View style={tw`absolute bottom-0 left-6`}>
            <Text style={tw`text-xs ${TEXT_COLORS.DARK_GRAY}`}>
              Novedad auspiciada por la comunidad Ecuaciclismo
            </Text>
          </View>
        </View>
      </ContenedorPaginasDetalle>
    </View>
  )
}

export default PublicidadIndividual
