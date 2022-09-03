import * as React from 'react'
import { Text, View, Image, Pressable } from 'react-native'
import tw from 'twrnc'
import { CustomText } from '../../atomos/CustomText'
import TarjetaTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import { TEXT_COLORS, WIDTH_DIMENSIONS } from '../../../utils/constants'
import LinkedBadges from '../../moleculas/LinkedBadges'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import { Publicacion } from '../../../models/Publicaciones.model'
import VideoPlayer from 'expo-video-player'
import { ResizeMode } from 'expo-av'
import Reacciones from '../../moleculas/BarraReacciones'

interface TarjetaPublicacionesProps {
  publicacion: Publicacion
}

const TarjetaPublicaciones = ({ publicacion }: TarjetaPublicacionesProps) => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()

  const getImagenPrincipal = () => {
    const { multimediaResult } = publicacion
    const main = multimediaResult?.find((file) => file.tipo === 'image')
    if (!main) return null

    return (
      <Image
        source={{ uri: main?.link }}
        style={{ width: WIDTH_DIMENSIONS * 0.88, height: 100 }}
      />
    )
  }

  const getVideoPrincipal = () => {
    const { multimediaResult } = publicacion
    const main = multimediaResult?.find((file) => file.tipo === 'video')
    if (!main) return null

    return (
      <VideoPlayer
        style={{ width: WIDTH_DIMENSIONS * 0.88, height: 100 }}
        videoProps={{
          source: { uri: main.link },
          resizeMode: 'contain' as ResizeMode,
          isLooping: true,
        }}
      />
    )
  }

  const getImagePlaceholder = () => {
    return (
      <Image
        source={require('../../../../assets/publicacion_default_icon.png')}
        style={{
          width: WIDTH_DIMENSIONS * 0.88,
          height: 100,
          borderRadius: 40 / 2,
        }}
      />
    )
  }

  const portadaPrincipal =
    getImagenPrincipal() || getVideoPrincipal() || getImagePlaceholder()

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('DetallePublicacion', {
          token: publicacion.token || '',
        })
      }
    >
      <TarjetaTemplate shadow={false}>
        <View style={tw`pt-2 pb-4 relative`}>
          <CustomText style={`${TEXT_COLORS.DARK_BLUE}`}>
            {publicacion.titulo}
          </CustomText>
          <Text style={tw`${TEXT_COLORS.DARK_GRAY} capitalize text-xs mt-1`}>
            {publicacion.first_name} {publicacion.last_name}
          </Text>
          <View style={tw`my-3 w-full relative`}>
            {portadaPrincipal}
            <View style={tw`absolute bottom-1 -left-4`}>
              <LinkedBadges
                etiquetas={publicacion.etiquetasResult || []}
                tipo="transparent"
              />
            </View>
          </View>

          <View style={tw`w-full pb-4`}>
            <View style={tw`px-3 pt-1`}>
              <Text numberOfLines={2}>{publicacion.descripcion}</Text>
            </View>
          </View>

          <Pressable style={tw`absolute top-1 -right-2 px-4 py-2`}>
            <Image
              source={require('../../../../assets/tag_icon.png')}
              style={{ width: 15, height: 15 }}
            />
          </Pressable>

          <View style={tw`mx-auto `}>
            <Reacciones item={publicacion} type="Publicacion" />
          </View>
          {/* <View style={tw`absolute bottom-0 right-2`}>
            <Text style={tw`${TEXT_COLORS.DARK_GRAY} capitalize text-xs`}>
              {publicacion.first_name} {publicacion.last_name}{' '}
              {publicacion.ultimo_cambio}
            </Text>
          </View> */}
        </View>
      </TarjetaTemplate>
    </Pressable>
  )
}

export default TarjetaPublicaciones
