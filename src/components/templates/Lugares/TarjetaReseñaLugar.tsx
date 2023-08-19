import * as React from 'react'
import { Text, View, Image, StyleSheet} from 'react-native'
import tw from 'twrnc'
import { TEXT_COLORS } from '../../../utils/constants'
import { Reseña } from '../../../models/Lugares'

interface TarjetaReseñaLugarProps {
    reseña: Reseña
    tipo: string
}

const TarjetaReseñaLugar= ({
  reseña,
  tipo,
}: TarjetaReseñaLugarProps) => {
  console.log(reseña.fecha_creacion)
  return (
      <View style={[tw`bg-white mx-2 rounded-xl w-90 pt-2 px-2`,styles.borderContainer]}>
        <View style={tw`flex flex-row items-center`}>
          <View style={tw`relative px-2`}>
            <View style={tw`z-40 py-2`}>
              <Image
                source={
                  reseña.foto
                    ? { uri: reseña.foto }
                    : require('../../../../assets/user.png')
                }
                style={{ width: 40, height: 45, borderRadius: 400 / 2 }}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={tw`relative px-2 pr-12 `}>
            <Text
              style={tw`text-sm font-semibold capitalize ${TEXT_COLORS.DARK_BLUE}`}
            >
              {reseña.first_name} {reseña.last_name}
            </Text>
            <Text style={tw`text-sm`}>{reseña.contenido}</Text>
          </View>
        </View>
        <View style={tw`flex flex-row justify-center`}>
              <View style={tw`flex flex-col items-center mx-2`}>
                  <Text style={tw`text-sm text-gray-500`}>{reseña.puntuacion_seguridad}</Text>
                  <Text style={tw`text-sm text-amber-500`}>Seguridad</Text>
              </View>
              {tipo === 'local' && (
                <>
                  <View style={tw`flex flex-col items-center mx-2`}>
                      <Text style={tw`text-sm text-gray-500`}>{reseña.puntuacion_atencion}</Text>
                      <Text style={tw`text-sm text-amber-500`}>Atención</Text>
                  </View>
                  <View style={tw`flex flex-col items-center mx-2`}>
                      <Text style={tw`text-sm text-gray-500`}>{reseña.puntuacion_limpieza}</Text>
                      <Text style={tw`text-sm text-amber-500`}>Limpieza</Text>
                  </View>
                </>
              )}


        </View>
        <View style={tw`flex flex-row justify-end mt-2`}>
              <Text style={tw`text-sm text-gray-500`}>{ getTiempoTranscurridoReseña(reseña.fecha_creacion as any)}</Text>
        </View>
      </View>
  )
}

export default TarjetaReseñaLugar
const styles = StyleSheet.create({
  borderContainer: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20
  },
})