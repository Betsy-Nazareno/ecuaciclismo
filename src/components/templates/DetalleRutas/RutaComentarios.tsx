import * as React from 'react'
import tw from 'twrnc'
import { Text, View } from 'react-native'
import { capitalize } from '../../../utils/capitalizeText'
import TitleWithDivider from '../../moleculas/TitleWithDivider'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import { TEXT_COLORS } from '../../../utils/constants'
import RatingStars from '../../atomos/RatingStars'

interface RutaComentariosProps {
  participantes: any[]
}

const RutaComentarios = ({ participantes }: RutaComentariosProps) => {
  return (
    <RoundedWhiteBaseTemplate shadow={false}>
      <TitleWithDivider label="Comentarios" />
      {participantes && participantes.length > 0 ? (
        participantes.map((participante, index) => {
          if (!participante.comentario) return null
          return (
            <View key={index} style={tw`mb-3`}>
              <View style={tw`flex flex-row items-center`}>
                <Text style={tw`font-semibold ${TEXT_COLORS.DARK_BLUE} pr-4`}>
                  {capitalize(participante.first_name)}{' '}
                  {capitalize(participante.last_name)}
                </Text>
                <RatingStars
                  readonly={true}
                  stars={participante.estrellas || 0}
                  size={15}
                />
              </View>
              <Text style={tw`italic text-black text-opacity-60`}>
                {`"`}
                {participante.comentario}
                {`"`}
              </Text>
            </View>
          )
        })
      ) : (
        <Text
          style={tw`${TEXT_COLORS.GRAY_PLACEHOLDER} italic font-semibold text-base text-center`}
        >
          Aún no hay comentarios para esta ruta
        </Text>
      )}
    </RoundedWhiteBaseTemplate>
  )
}

export default RutaComentarios
