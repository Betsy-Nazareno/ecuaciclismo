import * as React from 'react'
import { Text,View, Image, Pressable, Modal, TouchableOpacity, ImageSourcePropType, Linking, Alert } from 'react-native'
import { Solicitud } from '../../../models/Solicitud'
import { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux'
import EmptyPublicacionDetalle from '../../organismos/EmptyPublicacionDetalle'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import tw from 'twrnc'
import DetalleAlertante from '../../moleculas/DetalleUsuario'
import {  getTiempoTranscurridoReseña } from '../../../utils/TiempoTranscurrido'
import InfoEstadoSolicitud from '../../moleculas/infoEstadoSolicitud'
import { BACKGROUND_COLORS, HEIGHT_DIMENSIONS, TEXT_COLORS, WIDTH_DIMENSIONS} from '../../../utils/constants'
import ResponderSolicitud from '../../moleculas/ResponderSolicitud'
import { CustomText } from '../../atomos/CustomText'
import MapView, { Marker } from 'react-native-maps'
import Gap from '../../atomos/Gap'
import RutasParticipantes from '../DetalleRutas/RutasParticipantes'
import AdminValidator from '../AdminValidator'
import Ruler from '../../atomos/Ruler'
import { User } from '../../../models/User'
import { getDetalleUsuario } from '../../../lib/services/user.services'
import PerfilFotoHeader from '../Perfil/PerfilFotoHeader'
import PerfilInformacionPersonal from '../Perfil/PerfilInformacionPersonal'
import PerfilRutasInteres from '../Perfil/PerfilRutasInteres'
import PerfilInformacionBicicleta from '../Perfil/PerfilInformacionBicicleta'
import PerfilRutasRecorridas from '../Perfil/PerfilRutasRecorridas'
import SolicitudLocalDetallesAdicional from "./SolicitudLocalDetallesAdicional";

interface SolicitudesDetalleProps {
  solicitud: Solicitud
}

/**
 * Obtiene el objeto para renderizar una imagen o en caso contrario una imagen por defecto.
 * 
 * @param uri 
 * @returns 
 */
function getImage(uri?: string) {
  if(uri)
    return { uri } as ImageSourcePropType;
  return require('../../../../assets/tienda.png');
}

const SolicitudDetalle = ({ solicitud }: SolicitudesDetalleProps) => {
    const {user} = useSelector((state: RootState) => state.user)
    const [isRending, setIsRending] = React.useState(true)
    const [solicitudState, setSolicitud] = React.useState<Solicitud>()
    const [showMapView, setShowMapView] = React.useState(false);
    const { authToken, refreshUser } = useSelector(
      (state: RootState) => state.user
    )
    const [hasRefresh, setHasRefresh] = React.useState(false)
    const [detalleUser, setDetalleUser] = React.useState<Partial<User>>({})
    
    React.useEffect(() => {
      ;(async () => {
        setSolicitud(solicitud)
        setIsRending(false)
      })()
    }, [])

    React.useEffect(() => {
      ;(async () => {
        if (authToken) {
          const detalle = await getDetalleUsuario(authToken, user?.id_usuario)
          setDetalleUser(detalle)

        }
      })()
    }, [ hasRefresh, refreshUser])

    const url = solicitud.path_Pdf;
    const handlePress = React.useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    const handleCloseMapView = () => {
      setShowMapView(false);
    };

    const handleOpenMapView = () => {
      setShowMapView(true);
    };

    const initialRegion = {
      latitude: solicitud?.ubicacion?.coordinateX.latitude || -2.1453021140388437,
      latitudeDelta: 0.2568955895381215,
      longitude: solicitud?.ubicacion?.coordinateX.longitude || -79.93498552590609,
      longitudeDelta: 0.13138934969902039,
    }

    return isRending ? (
      <EmptyPublicacionDetalle />
    ) : (
      <View style={tw`p-2`}>
        <RoundedWhiteBaseTemplate shadow={false}>
          <View style={tw`my-3`}>
            <CustomText style={`text-xl font-bold ${TEXT_COLORS.DARK_BLUE}`}>
              {solicitud?.nombre}
            </CustomText>
          </View>

          <View style={tw`flex-row items-center`}>
            <View style={tw`z-40`}>
              <DetalleAlertante
                nombre={`${solicitud?.first_name} ${solicitud?.last_name}`}
                fecha={getTiempoTranscurridoReseña(solicitud?.fecha_creacion as any)}
                foto={solicitud?.foto}
              />
              
            </View>
        
            <View style={tw`ml-auto`} >
              <InfoEstadoSolicitud estadoSolicitud={solicitud.estado} />
            </View>
          </View>
          {solicitud.estado=="Rechazada" && solicitud.motivo_rechazo ? (
                <View
                  style={tw`mx-6 mt-4 bg-gray-100 rounded-xl px-8 py-4 border-2 border-dashed border-[#c6c6c6]`}
                >
                  <Text>{solicitud.motivo_rechazo}</Text>
                </View>
              ) : null}

          {solicitud.tipo=='Membresia' || solicitud.tipo=='Verificacion' ?(
            <>
              <PerfilFotoHeader
                isAdmin={!!detalleUser?.admin}
                nombre={detalleUser?.first_name}
                apellido={detalleUser?.last_name}
                email={detalleUser?.email}
                telefono={detalleUser?.telefono}
                idUser={user?.id_usuario}
                tipo={detalleUser?.tipo}
                editable={false}
                dimensionWidth={WIDTH_DIMENSIONS*0.85}
              />
              <Ruler style={`w-11/12 mx-auto ${BACKGROUND_COLORS.GRAY} my-4`} />

              <PerfilInformacionPersonal
                edad={detalleUser?.edad || '_'}
                nivel={detalleUser?.nivel || 'Nivel Básico'}
                peso={detalleUser?.peso || '_'}
                genero={detalleUser?.genero || '_ Género'}
              />
              <Ruler style={`w-11/12 mx-auto ${BACKGROUND_COLORS.GRAY} my-4`} />

              <PerfilRutasInteres tipoRutas={detalleUser?.etiquetas} />
              <Ruler style={`w-11/12 mx-auto ${BACKGROUND_COLORS.GRAY} my-4`} />

              <PerfilInformacionBicicleta
                tipo={detalleUser?.tipoBicicleta}
                marca={detalleUser?.marca}
                codigo={detalleUser?.codigo}
                foto={detalleUser?.foto_bicicleta}
              />

              <Ruler style={`w-11/12 mx-auto ${BACKGROUND_COLORS.GRAY} my-4`} />

              <PerfilRutasRecorridas rutas={detalleUser?.rutas} userToken={user?.id_usuario} />
              <Ruler style={`${BACKGROUND_COLORS.GRAY} mt-4`} />
            </>
          ):(
            <>
              <View style={tw`mx-auto mt-5`}>
                <Image
                  source={getImage(solicitud.imagen)}
                  style={{
                    width: WIDTH_DIMENSIONS * 0.8,
                    height: 200,
                    borderRadius: 20 / 2,
                  }}
                />
              </View>

              <Pressable
                style={tw`flex flex-row items-center mt-4 mb-2`}
                onPress={handleOpenMapView}>
                <Image
                  source={require('../../../../assets/posicion_icon.png')}
                  style={{ width: 25, height: 25, marginLeft: 10 }}
                />
                
                {/* Texto del enlace */}
                <Text style={tw`text-base font-semibold underline italic ${TEXT_COLORS.DARK_BLUE}`}>
                  Ver ubicacion
                </Text>
              </Pressable>
              
              <View style={tw`pt-4 pb-2 px-4`}>
                <Text style={tw`${TEXT_COLORS.DARK_GRAY} text-sm font-semibold mb-2`}>
                  Descripcion:
                </Text>
                <Text style={tw`${TEXT_COLORS.DARK_BLUE} text-sm`}>
                  {solicitud.descripcion}
                </Text>
              </View>

              <View style={tw`pt-4 pb-2 px-4`}>
                <Text style={tw`${TEXT_COLORS.DARK_GRAY} text-sm font-semibold mb-2`}>
                  Servicio que ofrece:
                </Text>
                <Text style={tw`${TEXT_COLORS.DARK_BLUE} text-sm`}>
                  {solicitud.servicio_local || 'No hay datos sobre el servicio'}
                </Text>
              </View>
              
              {
                solicitud.es_propietario
                ? <SolicitudLocalDetallesAdicional solicitud={solicitud} />
                : null
              }
            </>
          )}
          
        {
          solicitud.path_Pdf 
          ? 
          (
            <Pressable
              onPress={handlePress}
              style={tw`flex flex-row items-center px-3 mt-3`}
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
          : null
        }
        <Modal visible={showMapView} transparent animationType="slide">
          <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          
          <MapView style={{width: WIDTH_DIMENSIONS-50, height: HEIGHT_DIMENSIONS -60}} initialRegion={initialRegion}>
              <Marker
                coordinate={initialRegion}
                >
                <Image
                  source={require('../../../../assets/lugares.png')}
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
        </Modal>
        </RoundedWhiteBaseTemplate>
        {
          solicitud.tipo=='Verificacion' 
          ? 
          ( 
            <RoundedWhiteBaseTemplate shadow={false}>
              <Image
                  source={{ uri: solicitud?.imagen } as ImageSourcePropType}
                  style={{
                    width: WIDTH_DIMENSIONS * 0.8,
                    height: 200,
                    borderRadius: 20 / 2,
                  }}
                />
                <View style={tw`pt-4 pb-4 px-4`}>
                  <Text style={tw`${TEXT_COLORS.DARK_BLUE} text-sm`}>
                    {solicitud.descripcion}
                  </Text>
                </View>
            </RoundedWhiteBaseTemplate>
          ) 
          :null
        }
        {
          solicitud.usuarios
          ?
          (
            <RutasParticipantes participantes={solicitud?.usuarios || []} label="Usuarios que lo conocen" texto='No se ha marcado a ningun usuario conocido'/>
          )
          :null
        }
        <AdminValidator>
          <ResponderSolicitud solicitud={solicitud} setSolicitud={setSolicitud}/>
        </AdminValidator>
      </View>
    )
}
    
export default SolicitudDetalle
