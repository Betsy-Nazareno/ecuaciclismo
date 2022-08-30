import * as React from 'react'
import tw from 'twrnc'
import { Text, View, Image } from 'react-native'
import { CustomText } from '../../atomos/CustomText'
import HeaderRoundedContainer from '../../moleculas/HeaderRoundedContainer'
import {
  HEIGHT_DIMENSIONS,
  TEXT_COLORS,
  WIDTH_DIMENSIONS,
} from '../../../utils/constants'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import FeedbackRuta from '../../moleculas/FeedbackRuta'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { enviarComentariosRuta } from '../../../lib/services/rutas.services'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../../models/Screens.types'

interface Props {
  tokenRuta: string
  tokenUsuario: string
}

const ReporteRutaIncompleta = ({ tokenRuta, tokenUsuario }: Props) => {
  const [comentario, setComentario] = React.useState('')
  const [stars, setStars] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)
  const { authToken, user } = useSelector((state: RootState) => state.user)
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()

  const sendFeedback = async () => {
    setIsLoading(true)
    if (authToken) {
      await enviarComentariosRuta(stars, comentario, authToken, tokenRuta)
    }
    navigation.navigate('Rutas')
    setIsLoading(false)
  }

  return (
    <View style={tw`px-2`}>
      <HeaderRoundedContainer>
        <CustomText
          containerProps={{ textAlign: 'center' }}
          style={`${TEXT_COLORS.DARK_BLUE} text-3xl`}
        >
          ¡Sigue así!
        </CustomText>

        <View style={tw`flex flex-col items-center mt-4`}>
          <Image
            source={require('../../../../assets/ruta_incompleta_icon.png')}
            style={{
              width: WIDTH_DIMENSIONS * 0.5,
              height: HEIGHT_DIMENSIONS * 0.3,
            }}
            resizeMode="contain"
          />
          <View style={tw`mt-2 mb-8`}>
            <Text
              style={tw`${TEXT_COLORS.GRAY_PLACEHOLDER} text-lg text-center`}
            >
              Continua practicando.
            </Text>
            <Text
              style={tw`${TEXT_COLORS.GRAY_PLACEHOLDER} text-lg text-center`}
            >
              ¡Nos vemos en la siguiente ruta!
            </Text>
          </View>
        </View>
      </HeaderRoundedContainer>

      <RoundedWhiteBaseTemplate shadow={false}>
        <FeedbackRuta
          stars={stars}
          setStars={setStars}
          comentario={comentario}
          setComentario={setComentario}
          isLoading={isLoading}
          sendFeedback={sendFeedback}
          isReadOnly={tokenUsuario !== user?.id_usuario}
        />
      </RoundedWhiteBaseTemplate>
    </View>
  )
}

export default ReporteRutaIncompleta
