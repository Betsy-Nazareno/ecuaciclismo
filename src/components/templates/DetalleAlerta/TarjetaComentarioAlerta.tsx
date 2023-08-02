import * as React from 'react'
import { Text, View, Image } from 'react-native'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import tw from 'twrnc'
import { TEXT_COLORS } from '../../../utils/constants'
import { Comentario } from '../../../models/Alertas'
import { getTiempoTranscurrido } from '../../../utils/TiempoTranscurrido'

interface TarjetaComentarioAlertaProps {
  comentario: Comentario
}

const TarjetaComentarioAlerta= ({
  comentario,
}: TarjetaComentarioAlertaProps) => {
  return (
    <RoundedWhiteBaseTemplate shadow={false}>
      <View style={tw`flex flex-row items-center`}>
        <View style={tw`relative px-2 w-2/12 `}>
          <View style={tw`z-40 py-2`}>
            <Image
              source={
                comentario.foto
                  ? { uri: comentario.foto }
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
            {comentario.first_name} {comentario.last_name}
          </Text>
          <Text style={tw`text-sm`}>{comentario.comentario}</Text>
        </View>
      </View>
      <View style={tw`flex flex-row justify-end mt-2`}>
            <Text style={tw`text-sm text-gray-500`}>{ getTiempoTranscurrido(comentario.fecha_creacion as any)}</Text>
          </View>
    </RoundedWhiteBaseTemplate>
  )
}

export default TarjetaComentarioAlerta
