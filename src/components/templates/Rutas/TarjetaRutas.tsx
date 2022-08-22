import * as React from 'react'
import tw from 'twrnc'
import { Text, View, Image, Pressable } from 'react-native'
import { CustomText } from '../../atomos/CustomText'
import {
  BACKGROUND_COLORS,
  ESTADOS_RUTA,
  TEXT_COLORS,
} from '../../../utils/constants'
import Gap from '../../atomos/Gap'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import { EstadoRuta, Ruta } from '../../../models/Rutas'
import ImageScaleColor from '../../moleculas/ImageScaleColor'
import { getEstadoRuta } from '../../../utils/parseRouteState'
import BandaEstadoRuta from '../../atomos/BandaEstadoRuta'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

interface TarjetaRutasProps {
  ruta: Ruta
}
const TarjetaRutas = ({ ruta }: TarjetaRutasProps) => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
  const { user } = useSelector((state: RootState) => state.user)

  const getColor = (estado: EstadoRuta) => {
    switch (estado) {
      case ESTADOS_RUTA.EN_CURSO:
        return `${BACKGROUND_COLORS.GREEN_PRIMARY} bg-opacity-12`
      case ESTADOS_RUTA.DISPONIBLE:
        return BACKGROUND_COLORS.BLUE_LIGHTER
      case ESTADOS_RUTA.CANCELADA:
      case ESTADOS_RUTA.FINALIZADA:
        return BACKGROUND_COLORS.GRAY_PLACEHOLDER
      case ESTADOS_RUTA.SIN_CUPOS:
        return `${BACKGROUND_COLORS.ORANGE} bg-opacity-8`
      default:
        return BACKGROUND_COLORS.BLUE_LIGHTER
    }
  }

  const getBandColor = (estado: EstadoRuta) => {
    switch (estado) {
      case ESTADOS_RUTA.EN_CURSO:
        return BACKGROUND_COLORS.GREEN_PRIMARY
      case ESTADOS_RUTA.DISPONIBLE:
        return BACKGROUND_COLORS.SKY_BLUE
      case ESTADOS_RUTA.CANCELADA:
        return `bg-black bg-opacity-40`
      case ESTADOS_RUTA.FINALIZADA:
        return `bg-black bg-opacity-70`
      case ESTADOS_RUTA.SIN_CUPOS:
        return BACKGROUND_COLORS.ORANGE
      default:
        return BACKGROUND_COLORS.BLUE_LIGHTER
    }
  }

  const getImageScale = (estado: EstadoRuta) => {
    switch (estado) {
      case ESTADOS_RUTA.EN_CURSO:
      case ESTADOS_RUTA.DISPONIBLE:
        return 'none'
      case ESTADOS_RUTA.CANCELADA:
      case ESTADOS_RUTA.FINALIZADA:
        return 'gray'
      case ESTADOS_RUTA.SIN_CUPOS:
        return 'red'
      default:
        return 'none'
    }
  }

  const getFecha = (fecha: string) => {
    if (!fecha) return
    const date = new Date(fecha)
    const dia = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    const minutos = date.getMinutes()
    const hora = `${date.getHours()}:${minutos === 0 ? '00' : minutos}`
    return `${dia} ${hora}`
  }

  const getImagenPrincipal = () => {
    const [main] = ruta.fotos || []
    if (!main) return null

    return main?.link
  }

  const {
    participantes: participantesRutas = [],
    inscrito,
    aprobado,
  } = ruta || {}
  const estadoRuta = getEstadoRuta(ruta.estado)
  const color = aprobado ? getColor(estadoRuta) : BACKGROUND_COLORS.BLUE_LIGHTER
  const bandColor = getBandColor(estadoRuta)
  const imageScale = aprobado ? getImageScale(estadoRuta) : 'none'
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('DetalleRuta', { token: ruta.token || '' })
      }
      style={tw`my-1 relative overflow-hidden shadow-xl`}
    >
      <View
        style={tw`rounded-xl flex flex-row items-center py-2 px-4 ${color}`}
      >
        <ImageScaleColor
          scale={imageScale}
          image={{ uri: getImagenPrincipal() }}
        />

        <View style={tw`pl-5 pt-2`}>
          <CustomText style={`${TEXT_COLORS.DARK_BLUE}`}>
            {ruta.nombre}
          </CustomText>
          <Gap py="1">
            <Text style={tw`${TEXT_COLORS.DARK_BLUE}`}>@ {ruta.lugar}</Text>
            <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-semibold`}>
              {getFecha(ruta.fecha_inicio as any)}
            </Text>
          </Gap>

          {inscrito && (
            <View style={tw`flex flex-row`}>
              <Image
                source={
                  user?.foto
                    ? { uri: user?.foto }
                    : require('../../../../assets/lorena.jpg')
                }
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 100 / 2,
                }}
                resizeMode="contain"
              />
              <Text style={tw`${TEXT_COLORS.DARK_BLUE} pl-2`}>
                Tú
                {participantesRutas.length > 1
                  ? `y  ${participantesRutas?.length} ciclistas más`
                  : ''}
              </Text>
            </View>
          )}
        </View>
      </View>
      {aprobado ? (
        <BandaEstadoRuta estado={estadoRuta} color={bandColor} />
      ) : (
        <BandaEstadoRuta
          estado="Pendiente"
          color={BACKGROUND_COLORS.DARK_BLUE}
        />
      )}
    </Pressable>
  )
}

export default TarjetaRutas
