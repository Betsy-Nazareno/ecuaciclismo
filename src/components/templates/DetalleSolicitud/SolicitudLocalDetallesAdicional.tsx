import * as React from 'react'
import { Text, View } from 'react-native'
import { Solicitud } from '../../../models/Solicitud'
import tw from 'twrnc'
import { BACKGROUND_COLORS, TEXT_COLORS } from '../../../utils/constants'

/**
 * 
 * 
 * @returns 
 */
const SolicitudLocalDetallesAdicional: React.FC<{ solicitud: Solicitud }> = ({ solicitud }) => {
  return (
    <>
      <View style={tw`pt-4 pb-2 px-4`}>
        <Text style={tw`${TEXT_COLORS.DARK_GRAY} text-sm font-semibold mb-2`}>
          Servicios adicionales:
        </Text>
        <View
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          {
            solicitud.servicios_extra
            ?
            (
              solicitud.servicios_extra?.map(((item, index) => {
                return (
                  <Text key={`${item}-${index}`} style={ tw`border-1 rounded-full p-2 mr-2 text-center ${BACKGROUND_COLORS.BLUE_LIGHTER}` }>
                    {item}
                  </Text>
                );
              }))
            )
            :
            (
              <Text style={tw`text-sm mb-2`}>
                No hay servicios adicionales asociados a este negocio
              </Text>
            )
          }
        </View>
      </View>

      <View style={tw`pt-4 pb-2 px-4`}>
        <Text style={tw`${TEXT_COLORS.DARK_GRAY} text-sm font-semibold mb-2`}>
          Productos:
        </Text>
        <View
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          {
            solicitud.tipos_productos
            ?
            (
              solicitud.tipos_productos?.map(((item, index) => {
                return (
                  <Text key={`${item}-${index}`} style={ tw`border-1 rounded-full p-2 mr-2 text-center ${BACKGROUND_COLORS.BLUE_LIGHTER}` }>
                    {item}
                  </Text>
                );
              }))
            )
            :
            (
              <Text style={tw`text-sm mb-2`}>
                No hay datos de productos que ofrezca este negocio
              </Text>
            )
          }
        </View>
      </View>
    </>
  );
};

export default SolicitudLocalDetallesAdicional;