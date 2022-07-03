import * as React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import ContenedorPaginasDetalle from '../templates/ContenedorPaginasDetalle'
import tw from 'twrnc'
import { TEXT_COLORS } from '../../../utils/constants'
import Ruler from '../atomos/Ruler'
import { Publicidad } from '../../../models/Publicidad.model'

interface PublicidadIndividualProps {
  data: Publicidad
}

const PublicidadIndividual = ({ data }: PublicidadIndividualProps) => {
  return (
    <View style={tw`mx-2 relative `}>
      <ContenedorPaginasDetalle borderRight>
        <View style={tw`pb-24 relative`}>
          <Text
            style={tw`text-2xl font-bold text-center ${TEXT_COLORS.DARK_BLUE}`}
          >
            {data.titulo || ''}
          </Text>
          <View style={tw`mx-auto py-3`}>
            <View style={tw`mx-auto`}>
              <Image source={data.imagen} style={{ width: 200, height: 200 }} />
            </View>
          </View>
          <View style={tw`w-10/12 mx-auto pt-4 pb-4`}>
            <Text style={tw`text-base`}>{data.descripcion || ''}</Text>
          </View>

          <Ruler style="w-11/12 mx-auto bg-gray-200 mb-4" />

          <View style={tw`w-10/12 mx-auto`}>
            <Text style={tw`text-lg font-bold ${TEXT_COLORS.PRIMARY_BLUE}`}>
              Datos de contacto
            </Text>

            <View style={tw`pt-2`}>
              <Text style={tw`text-sm`}>
                Nombre: {data.datos_contacto?.nombre || ''}
              </Text>
            </View>

            <View style={tw`pt-2`}>
              <Text style={tw`text-sm`}>
                Celular: {data.datos_contacto?.celular || ''}
              </Text>
            </View>

            <View style={tw`pt-2`}>
              <Text style={tw`text-sm`}>
                Dirección: {data.datos_contacto?.direccion || ''}
              </Text>
            </View>
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
