import * as React from 'react'
import { Text, View, Image, Pressable } from 'react-native'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import {
  MIME_TYPES,
  TEXT_COLORS,
  WIDTH_DIMENSIONS,
} from '../../../utils/constants'
import DetallePublicador from '../../moleculas/DetalleUsuario'
import VerticalDivider from '../../atomos/VerticalDivider'
import Reacciones from '../../moleculas/BarraReacciones'
import BotonAgregarComentario from './BotonAgregarComentario'
import InputAgregarComentario from './InputAgregarComentario'
import TarjetaComentarioPublicacion from './TarjetaComentarioPublicacion'
import tw from 'twrnc'
import MenuPublicaciones from '../../moleculas/MenuPublicaciones'
import {
  MultimediaResult,
  Publicacion,
} from '../../../models/Publicaciones.model'
import { getPublicacionById } from '../../../lib/services/publicaciones.services'
import { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux'
import Carousel from 'react-native-swiper-flatlist';
import VideoPlayer from 'expo-video-player'
import { ResizeMode } from 'expo-av'
import NoteVoice from '../../moleculas/NoteVoice'
import * as FileSystem from 'expo-file-system'
import Gap from '../../atomos/Gap'
import EmptyPublicacionDetalle from '../../organismos/EmptyPublicacionDetalle'
import PermissionWrapper from '../PermissionWrapper'
import { CustomText } from '../../atomos/CustomText'

interface PublicacionProps {
  token: string
}
const PublicacionDetalle = ({ token }: PublicacionProps) => {
  const { authToken, user } = useSelector((state: RootState) => state.user)
  const [isAddingComent, setIsAddingComent] = React.useState(false)
  const [publicacion, setPublicacion] = React.useState<Publicacion>()
  const [isRending, setIsRending] = React.useState(true)

  React.useEffect(() => {
    ;(async () => {
      if (authToken && token) {
        setPublicacion(await getPublicacionById(authToken, token))
      }
      setIsRending(false)
    })()
  }, [isAddingComent, token])

  const onClickDownload = async (link: string) => {
    const downloadResumable = FileSystem.createDownloadResumable(
      link,
      FileSystem.documentDirectory + 'file.pdf'
    )
    try {
      const { uri } = (await downloadResumable.downloadAsync()) || {}
      if (!uri) return
    } catch (e) {
      console.error(e)
    }
  }

  const diplayImagesAndVideos = (multimediaResult: MultimediaResult[]) => {
    const items = multimediaResult.map((file, index) => {
      switch (file.tipo) {
        case MIME_TYPES.IMAGE:
          return (
            <Image
              key={index}
              source={{ uri: file.link }}
              style={{
                width: WIDTH_DIMENSIONS * 0.85,
                height: 250,
                backgroundColor: '#fff',
              }}
              resizeMode="contain"
            />
          )
        case MIME_TYPES.VIDEO:
          return (
            <VideoPlayer
              key={index}
              style={{
                width: WIDTH_DIMENSIONS * 0.85,
                height: 250,
                videoBackgroundColor: '#fff',
              }}
              slider={{ visible: false }}
              videoProps={{
                source: { uri: file.link },
                resizeMode: 'contain' as ResizeMode,
                isLooping: true,
              }}
            />
          )
        default:
          return null
      }
    })
    const finalItems = items.filter((item) => item)
    if (finalItems.length > 0) {
      return finalItems
    }
    return (
      <View style={tw`mx-auto`}>
        <Image
          source={require('../../../../assets/publicacion_default_icon.png')}
          style={{ width: 200, height: 200 }}
        />
      </View>
    )
  }

  const displayNoteVoices = (multimediaResult: MultimediaResult[]) => {
    const items = multimediaResult.map((file, index) => {
      if (file.tipo === MIME_TYPES.AUDIO) {
        return (
          <RoundedWhiteBaseTemplate shadow={false} key={index}>
            <NoteVoice uriRecord={file.link} width={WIDTH_DIMENSIONS * 0.75} />
          </RoundedWhiteBaseTemplate>
        )
      }
    })
    return items.filter((item) => item)
  }

  const displayDocuments = (multimediaResult: MultimediaResult[]) => {
    const items = multimediaResult.map((file, index) => {
      if (file.tipo === MIME_TYPES.PDF) {
        return (
          <Pressable
            key={index}
            onPress={() => onClickDownload(file.link)}
            style={tw`flex flex-row items-center`}
          >
            <Image
              source={require('../../../../assets/pdf_icon.png')}
              style={{ width: 30, height: 30 }}
            />
            <Gap px="2">
              <Text style={tw`underline ${TEXT_COLORS.ORANGE}`}>file.pdf</Text>
            </Gap>
          </Pressable>
        )
      }
    })
    return items.filter((item) => item)
  }

  return isRending ? (
    <EmptyPublicacionDetalle />
  ) : (
    <View style={tw`p-2`}>
      <RoundedWhiteBaseTemplate shadow={false}>
        <View style={tw`relative`}>
          <PermissionWrapper
            tokenUserOwnerPublication={publicacion?.token_usuario}
          >
            <View style={tw`absolute right-0`}>
              <MenuPublicaciones
                userToken={authToken || ''}
                publicacion={publicacion as Publicacion}
              />
            </View>
          </PermissionWrapper>
        </View>

        <View style={tw`pt-3 px-2 relative z-10`}>
          <View style={tw`z-40`}>
            <DetallePublicador
              nombre={`${publicacion?.first_name} ${publicacion?.last_name}`}
              fecha={publicacion?.ultimo_cambio}
              foto={publicacion?.foto}
            />
          </View>

          <View style={tw`mt-6`}>
            <View style={tw`justify-center items-center`}>
              <Carousel
                    showPagination
                    index={0}
                    style={{
                      width: WIDTH_DIMENSIONS * 0.85,
                      height: 250,
                      
                    }}
                
                  >
                    {diplayImagesAndVideos(publicacion?.multimediaResult || [])}
                    
              </Carousel>
              </View>

            

            <View style={tw`pt-4`}>
              <CustomText
                style={`text-base font-bold ${TEXT_COLORS.DARK_BLUE}`}
              >
                {publicacion?.titulo || ''}
              </CustomText>
              <Gap py="2">
                <Text>{publicacion?.descripcion}</Text>
              </Gap>
            </View>

            <View style={tw`mt-4`}>
              {displayNoteVoices(publicacion?.multimediaResult || [])}
            </View>
            <View style={tw`mt-4`}>
              {displayDocuments(publicacion?.multimediaResult || [])}
            </View>

            <View style={tw`mx-auto my-2`}>
              <Reacciones item={publicacion} type="Publicacion" />
            </View>
          </View>
        </View>
      </RoundedWhiteBaseTemplate>

      <View>
        <VerticalDivider style="top-0 left-12 w-[2px]" />
        {publicacion?.comentarios?.map((comentario, index) => (
          <TarjetaComentarioPublicacion comentario={comentario} key={index} />
        ))}

        {!isAddingComent && (
          <View style={tw``}>
            <BotonAgregarComentario
              handleClick={() => setIsAddingComent(true)}
            />
          </View>
        )}

        {isAddingComent && (
          <View style={tw`pt-2`}>
            <InputAgregarComentario
              onSend={() => setIsAddingComent(!isAddingComent)}
              nombreUsuario={`${user?.first_name} ${user?.last_name}`}
              tokenUsuario={authToken || ''}
              tokenPublicacion={publicacion?.token || ''}
              tokenNotificacion={publicacion?.token_notificacion}
              fotoUsuario={user?.foto}
              tituloPublicacion={publicacion?.titulo}
            />
          </View>
        )}
      </View>
    </View>
  )
}

export default PublicacionDetalle
