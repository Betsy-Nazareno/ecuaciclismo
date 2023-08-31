import * as React from 'react'
import { Text,View, Image, Pressable, Modal, TouchableOpacity } from 'react-native'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import {
  BACKGROUND_COLORS,
  MIME_TYPES,
  TEXT_COLORS,
  WIDTH_DIMENSIONS,
  uri_perfil_icon,
  HEIGHT_DIMENSIONS
} from '../../../utils/constants'
import DetalleAlertante from '../../moleculas/DetalleUsuario'
import VerticalDivider from '../../atomos/VerticalDivider'
import BotonAgregarComentario from '../DetallePublicacion/BotonAgregarComentario'
import InputAgregarComentario from './InputAgregarComentario'
import TarjetaComentarioAlerta from './TarjetaComentarioAlerta'
import tw from 'twrnc'
import {Alerta} from '../../../models/Alertas'
import { MultimediaResult } from '../../../models/Publicaciones.model'
import { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux'
import VideoPlayer from 'expo-video-player'
import { ResizeMode } from 'expo-av'
import NoteVoice from '../../moleculas/NoteVoice'
import EmptyPublicacionDetalle from '../../organismos/EmptyPublicacionDetalle'
import { getAlertaById } from '../../../lib/services/alertas.services'
import InfoEstado from '../../moleculas/InfoEstado'
import Badge from '../../moleculas/Badge'
import { getTiempoTranscurrido } from '../../../utils/TiempoTranscurrido'
import Gap from '../../atomos/Gap'
import RutasParticipantes from '../DetalleRutas/RutasParticipantes'
import RutasRequisitos from '../DetalleRutas/RutaRequisitos'
import TitleWithDivider from '../../moleculas/TitleWithDivider'
import MenuAlertas from '../../moleculas/MenuAlertas'
import MapView, { Marker } from 'react-native-maps'
import ModalConfirmarAyuda from '../../atomos/ModalConfirmarAyuda'
import PermissionWrapperAlerta from '../PermissionWrapperAlerta'
import Carousel from 'react-native-swiper-flatlist';

interface DetallesAlertaProps {
  token: string
}

const AlertaDetalle = ({ token }: DetallesAlertaProps) => {
    const { authToken, user } = useSelector((state: RootState) => state.user)
    const [isAddingComent, setIsAddingComent] = React.useState(false)
    const [alerta, setAlerta] = React.useState<Alerta>()
    const [isRending, setIsRending] = React.useState(true)
    const [showHelpModal, setShowHelpModal] = React.useState(false);
    const [showMapView, setShowMapView] = React.useState(false);
    React.useEffect(() => {
      ;(async () => {
        if (authToken && token) {
          setAlerta(await getAlertaById(authToken, token))
        }
        setIsRending(false)
      })()
    }, [isAddingComent, token])
    const diplayImagesAndVideos = (multimediaResult: MultimediaResult[]) => {
        if (multimediaResult.length > 0) {
   
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
      const isEnCurso = alerta?.estado === 'En curso';
      const showHelpModalHandler = () => {
        setShowHelpModal(true);
      };
      
      const hideHelpModalHandler = () => {
        setShowHelpModal(false);
      };
      
      const initialRegion = {
        latitude: alerta?.ubicacion.coordinateX.latitude || -2.1453021140388437,
        latitudeDelta: 0.2568955895381215,
        longitude: alerta?.ubicacion.coordinateX.longitude || -79.93498552590609,
        longitudeDelta: 0.13138934969902039,
      }

      const handleOpenMapView = () => {
        setShowMapView(true);
      };

      const handleCloseMapView = () => {
        setShowMapView(false);
      };

      return isRending ? (
        <EmptyPublicacionDetalle />
      ) : (
        <View style={tw`p-2`}>
          <RoundedWhiteBaseTemplate shadow={false}>
            <View style={tw`relative`}>
              <PermissionWrapperAlerta
                tokenUserOwnerAlerta={alerta?.token_usuario}
              >
              {isEnCurso && (
              <View style={tw`absolute right-0 top-5`}>
                <MenuAlertas alerta={alerta as Alerta} setAlerta={setAlerta} />
              </View>
            )}
              </PermissionWrapperAlerta>
            </View>
    
            <View style={tw`pt-3 px-2 relative z-10`}>
              <View style={tw`z-40`}>
                <DetalleAlertante
                  nombre={`${alerta?.first_name} ${alerta?.last_name}`}
                  fecha={getTiempoTranscurrido(alerta?.fecha_creacion as any)}
                  foto={alerta?.foto}
                />
                
              </View>
          
              <View style={tw`flex flex-row justify-start ml-11`}>
                <InfoEstado estadoAlerta={alerta?.estado} />
                <Gap px="1" py='2'>
                  <Badge
                    name={alerta?.tipo}
                    label={alerta?.tipo}
                    backgroundColor={BACKGROUND_COLORS.WHITE}
                    stylesProp={`border-2 border-solid ${TEXT_COLORS.DARK_BLUE} `}
                    styleText={tw`${TEXT_COLORS.DARK_BLUE} `}
                    
                  />
            </Gap>
              </View>
              
              <View style={tw`mt-2`}>
              <View style={tw`justify-center items-center`}>
                <Carousel
                  showPagination
                  index={0}
                  style={{
                    width: WIDTH_DIMENSIONS * 0.85,
                    height: 250,
                    
                  }}
              

                >
                  {diplayImagesAndVideos(alerta?.multimediaResult || [])}
                  
                </Carousel>


              </View>
  
                  <Gap py="2">
                    <Text style={tw`text-base`}>{alerta?.descripcion}</Text>
                  </Gap>
          
                <View style={tw`mt-4`}>
                  {displayNoteVoices(alerta?.multimediaResult || [])}
                </View>
              </View>
            </View>
            {/* Agrega el botón para ver la ubicación */}
              {isEnCurso && alerta?.token_usuario!=authToken? (
                <Pressable
                style={tw`flex flex-row items-center mt-2 mb-2`}
                onPress={handleOpenMapView}>
                <Image
                  source={require('../../../../assets/posicion_icon.png')}
                  style={{ width: 25, height: 25, marginLeft: 10 }}
                />
                
                {/* Texto del enlace */}
                <Text style={tw`text-base font-semibold underline italic ${TEXT_COLORS.DARK_BLUE}`}>
                  Ver en el mapa
                </Text>
              </Pressable>
                ):(
                  <View style={tw`flex flex-row items-center mt-2 mb-2`}>
                    <Image
                      source={require('../../../../assets/posicion_icon.png')}
                      style={{ width: 25, height: 25, marginLeft: 10 }}
                    />
                    
                    <Text style={tw`text-base font-semibold underline italic ${TEXT_COLORS.DARK_BLUE}`}>
                      Ver en el mapa
                    </Text>
                </View>
                )
              
              }  
                {/* Modal para mostrar el MapView con el marcador */}
                <Modal visible={showMapView} transparent animationType="slide">
                  <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          

                    <MapView style={{width: WIDTH_DIMENSIONS-50, height: HEIGHT_DIMENSIONS -60}} initialRegion={initialRegion}>
                      <Marker
                        coordinate={alerta?.ubicacion.coordinateX}
                        onPress={showHelpModalHandler} 
                        >
                        <Image
                          source={{ uri: alerta?.foto ? alerta.foto : uri_perfil_icon }}
                          style={{ width: 35, height: 35, borderRadius: 100 / 2 }}
                        />
                      </Marker>

                    </MapView>
                    <TouchableOpacity style={tw`absolute top-4 right-4`} onPress={handleCloseMapView}>
                      <Image
                        source={require('../../../../assets/cancel_icon.png')}
                        style={{ width: 25, height: 25 }}
                      />
                    </TouchableOpacity>
                    
                  </View>
                  {/* Pequeño modal en la parte inferior */}
                  <ModalConfirmarAyuda 
                    showHelpModal={showHelpModal}
                    hideHelpModalHandler={hideHelpModalHandler}
                    alerta={alerta as Alerta}
                    setAlerta={setAlerta}
                  />
                </Modal>

          </RoundedWhiteBaseTemplate>
          {alerta?.colaboracionesValues && alerta?.colaboracionesValues?.length > 0 ? (
              <RutasRequisitos requisitos={alerta.colaboracionesValues} labe="Implementos de ayuda solicitados" />
          ) : null}
          <PermissionWrapperAlerta
                tokenUserOwnerAlerta={alerta?.token_usuario}
              >
              <RutasParticipantes participantes={alerta?.participantes || []} label="Confirmacion de ayuda" texto='Aun no hay personas que confirmen su ayuda'/>

          </PermissionWrapperAlerta>
    
          <View>
            <VerticalDivider style="top-0 left-12 w-[2px]" />
            <RoundedWhiteBaseTemplate shadow={false}>
            <TitleWithDivider label="Comentarios" />
            {alerta?.comentarios?.map((comentario, index) => (
              <TarjetaComentarioAlerta comentario={comentario} key={index} />
            ))}
          </RoundedWhiteBaseTemplate>
          {isEnCurso?(
            !isAddingComent && (
              <View style={tw``}>
                <BotonAgregarComentario
                  handleClick={() => setIsAddingComent(true)}
                />
              </View>
            )
            ) : (
              <Text style={tw`text-red-800 text-xs text-center`}>
                La alerta ha sido {alerta?.estado}, no se puede agregar más comentarios.
              </Text>
            )}
            
            {isAddingComent && (
              <View style={tw`pt-2`}>
                <InputAgregarComentario
                  onSend={() => setIsAddingComent(!isAddingComent)}
                  nombreUsuario={`${user?.first_name} ${user?.last_name}`}
                  tokenUsuario={authToken || ''}
                  tokenAlerta={alerta?.token || ''}
                  tokenNotificacion={alerta?.token_notificacion}
                  fotoUsuario={user?.foto}
                />
              </View>
            )}
          </View>
        </View>
      )
    }
    
    export default AlertaDetalle