import * as React from 'react'
import tw from 'twrnc'
import { Text, View } from 'react-native'
import { BACKGROUND_COLORS, TEXT_COLORS } from '../../utils/constants'
import RatingStars from '../atomos/RatingStars'
import Input from './Input'
import Spinner from '../atomos/Spinner'
import ButtonPrimary from '../atomos/ButtonPrimary'

interface FeedbackRutaProps {
  stars: number
  setStars: (value: number) => void
  comentario: string
  isReadOnly: boolean
  setComentario: (value: string) => void
  isLoading: boolean
  sendFeedback: () => void
}

const FeedbackRuta = ({
  stars,
  setStars,
  comentario,
  setComentario,
  isLoading,
  isReadOnly,
  sendFeedback,
}: FeedbackRutaProps) => {
  console.log(isReadOnly)
  return (
    <View style={tw`mt-4 flex flex-col items-center`}>
      <Text
        style={tw`${TEXT_COLORS.DARK_BLUE} text-xl text-center font-semibold`}
      >
        ¿Qué te pareció esta ruta?
      </Text>

      <RatingStars stars={stars} setStars={setStars} readonly={isReadOnly} />
      <Input
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        textAlignHorizontal="center"
        type="none"
        value={comentario}
        setValue={(text) => setComentario(text)}
        stylesInput={'bg-white'}
        placeholder="¡Dejanos un comentario!"
        stylesProp="w-full"
        editable={!isReadOnly}
      />
      <View style={tw`my-2`}>
        {!isReadOnly ? (
          isLoading ? (
            <Spinner />
          ) : (
            <ButtonPrimary
              label="¡Enviar comentario!"
              style={`${BACKGROUND_COLORS.DARK_BLUE} py-2 px-12 rounded-3xl`}
              handleClick={sendFeedback}
            />
          )
        ) : null}
      </View>
    </View>
  )
}

export default FeedbackRuta
