import * as React from 'react'
import tw from 'twrnc'
import { Image, Text, View } from 'react-native'
import { CustomText } from '../../atomos/CustomText'
import { TEXT_COLORS } from '../../../utils/constants'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import Ruler from '../../atomos/Ruler'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import {
  enviarComentariosRuta,
  getDatosRastreoById,
} from '../../../lib/services/rutas.services'
import { HitosRuta } from '../../../models/Rutas'
import { capitalize } from '../../../utils/capitalizeText'
import HeaderRoundedContainer from '../../moleculas/HeaderRoundedContainer'
import Hito from '../../moleculas/Hito'
import { getAdminTokens } from '../../../lib/services/notifications.services'
import { usePermissionsNotifications } from '../../../hooks/usePermissionsNotifications'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import FeedbackRuta from '../../moleculas/FeedbackRuta'

interface ReporteFinalRutaProps {
  tokenRuta: string
  tokenUsuario: string
}

const ReporteFinalRuta = ({
  tokenRuta,
  tokenUsuario,
}: ReporteFinalRutaProps) => {
  const { authToken, user } = useSelector((state: RootState) => state.user)
  const [hitosRuta, setHitosRuta] = React.useState<HitosRuta>()
  const [comentario, setComentario] = React.useState('')
  const [stars, setStars] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)
  const { sendPushNotification } = usePermissionsNotifications()
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()

  React.useEffect(() => {
    ;(async () => {
      if (authToken && user?.id_usuario) {
        const datosRastreo = await getDatosRastreoById(
          tokenRuta,
          authToken,
          tokenUsuario
        )
        setHitosRuta(datosRastreo)
        setStars(datosRastreo?.estrellas || 0)
        setComentario(datosRastreo?.comentario || '')
      }
    })()
  }, [])

  const sendNotificationComentariosToAdmins = async () => {
    if (!authToken) return
    const tokens = await getAdminTokens(authToken)
    await sendPushNotification({
      tokens,
      title: `Nuevos comentarios en ruta ${hitosRuta?.nombre}`,
      body: `${capitalize(hitosRuta?.first_name)} ${capitalize(
        hitosRuta?.last_name
      )} ha comentado esta ruta`,
    })
  }

  const sendFeedback = async () => {
    setIsLoading(true)
    if (authToken) {
      await enviarComentariosRuta(stars, comentario, authToken, tokenRuta)
    }
    await sendNotificationComentariosToAdmins()
    navigation.navigate('Rutas')
    setIsLoading(false)
  }
  const readOnly = tokenUsuario !== user?.id_usuario
  return (
    <View style={tw`px-4`}>
      <HeaderRoundedContainer>
        {!readOnly ? (
          <CustomText
            style={`${TEXT_COLORS.DARK_BLUE} text-2xl`}
            containerProps={{ textAlign: 'center' }}
          >
            ¡Felicidades {capitalize(hitosRuta?.first_name || '')}!
          </CustomText>
        ) : (
          <CustomText
            style={`${TEXT_COLORS.DARK_BLUE} text-2xl`}
            containerProps={{ textAlign: 'center' }}
          >
            Los hitos de {capitalize(hitosRuta?.first_name || '')} en{' '}
            {hitosRuta?.nombre || ''}
          </CustomText>
        )}
        <View style={tw`relative mx-auto`}>
          <Image
            source={
              user?.foto
                ? { uri: hitosRuta?.foto }
                : require('../../../../assets/user.png')
            }
            style={{
              width: 200,
              height: 200,
              borderRadius: 1000 / 2,
              borderWidth: 12,
              borderColor: '#fff',
              marginVertical: 12,
            }}
            resizeMode="contain"
          />
          <Image
            source={require('../../../../assets/lazo.png')}
            style={{
              width: 50,
              height: 90,
              position: 'absolute',
              bottom: 0,
              right: 0,
            }}
            resizeMode="contain"
          />
        </View>

        {!readOnly ? (
          <Text
            style={tw`${TEXT_COLORS.DARK_BLUE} font-semibold text-xl text-center`}
          >
            Tus hitos en {hitosRuta?.nombre}
          </Text>
        ) : null}
        <View style={tw`w-10/12 mt-4 mx-auto mb-4`}>
          <Hito
            label={`${hitosRuta?.horas?.toFixed(2)} horas de recorrido`}
            image={require('../../../../assets/reloj.png')}
          />

          <Ruler style={`w-7/12 mx-auto bg-[#f4f4f4]`} />
          <Hito
            label={`${hitosRuta?.kilometros?.toFixed(1)} Km pedaleados`}
            image={require('../../../../assets/rastreo_ruta_icon.png')}
          />
          <Ruler style={`w-7/12 mx-auto bg-[#f4f4f4]`} />
          <Hito
            label={`Velocidad ${hitosRuta?.velocidad?.toFixed(1)} km/h`}
            image={require('../../../../assets/velocidad_icon.png')}
          />
          <Ruler style={`w-7/12 mx-auto bg-[#f4f4f4]`} />
          <Hito
            label={`${hitosRuta?.kilocalorias?.toFixed(
              1
            )} kilocalorias quemadas`}
            image={require('../../../../assets/calorias.png')}
          />
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
          isReadOnly={readOnly}
        />
      </RoundedWhiteBaseTemplate>
    </View>
  )
}

export default ReporteFinalRuta
