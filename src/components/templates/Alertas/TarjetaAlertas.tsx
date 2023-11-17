import * as React from 'react'
import tw from 'twrnc'
import { Text, View, Pressable } from 'react-native'
import {
  BACKGROUND_COLORS,  BORDER_COLORS,  TEXT_COLORS,
} from '../../../utils/constants'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import {Alerta } from '../../../models/Alertas'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import TarjetaTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import InformacionUsuario from '../../atomos/InformacionUsuario'
import Gap from '../../atomos/Gap'
import Badge from '../../moleculas/Badge'
import InfoEstado from '../../moleculas/InfoEstado'
import { getTiempoTranscurrido } from '../../../utils/TiempoTranscurrido'


interface TarjetaAlertasProps {
  alerta: Alerta
}
const TarjetaAlertas = ({ alerta }: TarjetaAlertasProps) => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
  const { authToken } = useSelector((state: RootState) => state.user)

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('DetalleAlerta', { token: alerta.token || '' })}
    >
      <TarjetaTemplate shadow={false}>
        <View style={tw`flex flex-row justify-between relative`}>
          
          { alerta?.token_usuario!=authToken &&(
          <InformacionUsuario
            firstName={alerta?.first_name || ''}
            lastName={alerta?.last_name || ''}
            foto={alerta?.foto}
          />
          )}
        </View>
        <View style={tw`flex flex-row justify-start ml-8`}>
            <InfoEstado estadoAlerta={alerta.estado} />
            <Gap px="1" py='2'>
              <Badge
                name={alerta.nombre}
                label={alerta.nombre}
                backgroundColor={BACKGROUND_COLORS.WHITE}
                stylesProp={`border-2 border-solid ${BORDER_COLORS.DARK_BLUE}`}
                styleText={tw`${TEXT_COLORS.DARK_BLUE} `}
              />
            </Gap>
        </View>
    
      
      <Text style={tw`text-base mt-4 ml-10`}>{alerta.descripcion}</Text>

      
      <View style={tw`flex flex-row justify-end mt-2`}>
        <Text style={tw`text-sm text-gray-500`}>{ getTiempoTranscurrido(alerta.fecha_creacion as any)}</Text>
      </View>

      </TarjetaTemplate>      
    </Pressable>
  )
}

export default TarjetaAlertas
