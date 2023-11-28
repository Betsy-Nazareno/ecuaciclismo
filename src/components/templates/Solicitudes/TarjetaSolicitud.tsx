import * as React from 'react'
import tw from 'twrnc'
import { Text, View, Pressable, Image } from 'react-native'
import { TEXT_COLORS} from '../../../utils/constants'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootDrawerParamList, ScreensDrawer } from '../../../models/Screens.types'
//import { useSelector } from 'react-redux'
//import { RootState } from '../../../redux/store'
import TarjetaTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import InformacionUsuario from '../../atomos/InformacionUsuario'
import Gap from '../../atomos/Gap'
import { Solicitud } from '../../../models/Solicitud'
import { CustomText } from '../../atomos/CustomText'
import InfoEstadoSolicitud from '../../moleculas/infoEstadoSolicitud'
import { getTiempoTranscurridoReseña } from '../../../utils/TiempoTranscurrido'


interface TarjetaSolicitudProps {
  solicitud: Solicitud
}
const TarjetaSolicitud = ({ solicitud }: TarjetaSolicitudProps) => {
  console.log(solicitud);
  const navigation =
    useNavigation<NavigationProp<RootDrawerParamList, ScreensDrawer>>()
  
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('DetalleSolicitud', { solicitud: solicitud  })}
    >
      <TarjetaTemplate shadow={false}>
        <View style={tw`flex-row items-center`}>
          <CustomText style={`${TEXT_COLORS.DARK_BLUE} font-semibold`}>
            {solicitud.nombre}
          </CustomText>
          <View style={tw`ml-auto`}>
            <InfoEstadoSolicitud estadoSolicitud={solicitud.estado} />
          </View>
        </View>

        {solicitud.tipo==('Membresia'|| 'Verificacion') &&(
            <InformacionUsuario
            firstName={solicitud?.first_name || ''}
            lastName={solicitud?.last_name || ''}
            foto={solicitud?.foto}
            /> 

        )}
        {solicitud.tipo==('Recomendados' || 'Registro Local') &&(
            <View 
            style={tw`rounded-xl flex flex-row items-center py-2 px-2`}
            >
                <Image 
                source={{uri:solicitud.imagen}}
                style={{
                width:70,
                height:70,
                borderRadius:5,    
                }}
                />
                <View style={tw`pl-2 pr-11`}>
                    <Gap py="1">
                        <Text style={{ flexWrap: 'wrap' }}> {solicitud.descripcion}</Text>
                    </Gap>

                </View>
            </View>

        )}

        <View style={tw`flex flex-row justify-end mt-2`}>
            <Text style={tw`text-sm text-gray-500`}>{ getTiempoTranscurridoReseña(solicitud.fecha_creacion as any)}</Text>
        </View>

      </TarjetaTemplate>      
    </Pressable>
  )
}

export default TarjetaSolicitud