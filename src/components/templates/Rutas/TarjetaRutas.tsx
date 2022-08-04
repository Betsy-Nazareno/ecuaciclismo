import * as React from 'react'
import tw from 'twrnc'
import { Text, View, Image, Pressable, StyleSheet } from 'react-native'
import { CustomText } from '../../atomos/CustomText'
import {
  BACKGROUND_COLORS,
  ESTADOS_RUTA,
  TEXT_COLORS,
} from '../../../utils/constants'
import Gap from '../../atomos/Gap'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import { EstadoRuta } from '../../../models/Rutas'
import ImageScaleColor from '../../moleculas/ImageScaleColor'
import ButtonPrimary from '../../atomos/ButtonPrimary'
import Badge from '../../moleculas/Badge'
import ParticipantesFotoMiniatura from '../../moleculas/ParticipantesFotoMiniatura'

interface TarjetaRutasProps {
  estado: EstadoRuta
  inscrito?: boolean
}

const TarjetaRutas = ({ estado, inscrito = false }: TarjetaRutasProps) => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()

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

  const getBandColor = () => {
    switch (estado) {
      case ESTADOS_RUTA.EN_CURSO:
        return BACKGROUND_COLORS.GREEN_PRIMARY
      case ESTADOS_RUTA.DISPONIBLE:
        return BACKGROUND_COLORS.SKY_BLUE
      case ESTADOS_RUTA.CANCELADA:
      case ESTADOS_RUTA.FINALIZADA:
        return `bg-black bg-opacity-10`
      case ESTADOS_RUTA.SIN_CUPOS:
        return BACKGROUND_COLORS.ORANGE
      default:
        return BACKGROUND_COLORS.BLUE_LIGHTER
    }
  }

  const getImageScale = () => {
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

  const color = getColor(estado)
  const bandColor = getBandColor()
  const imageScale = getImageScale()
  return (
    <Pressable
      onPress={() => navigation.navigate('DetalleRuta')}
      style={tw`my-1 relative overflow-hidden`}
    >
      <View
        style={tw`rounded-xl flex flex-row items-center py-2 px-4 ${color}`}
      >
        <ImageScaleColor
          scale={imageScale}
          image={require('../../../../assets/rutaImage.png')}
          colorBanda={bandColor}
          label={estado}
        />

        <View style={tw`pl-5 pt-2`}>
          <CustomText style={`${TEXT_COLORS.DARK_BLUE}`}>Salinas</CustomText>
          <Gap py="1">
            <Text style={tw`${TEXT_COLORS.DARK_BLUE}`}>
              @ Malecón de Salinas
            </Text>
            <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-semibold`}>
              06/02/2022 07:00 AM
            </Text>
            <Text style={tw`${TEXT_COLORS.DARK_BLUE} `}>Nivel Intermedio</Text>
          </Gap>
          {inscrito && (
            <View style={tw`flex flex-row`}>
              <Image
                source={require('../../../../assets/lorena.jpg')}
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 100 / 2,
                }}
              />
              <Text style={tw`${TEXT_COLORS.DARK_BLUE} pl-2`}>
                Tú y 34 ciclistas más
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  )
}

export default TarjetaRutas
