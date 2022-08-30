import * as React from 'react'
import { Text, View } from 'react-native'
import tw from 'twrnc'
import { TEXT_COLORS } from '../../../utils/constants'
import { CustomText } from '../../atomos/CustomText'
import Gap from '../../atomos/Gap'
import RutaRecorrida from '../../moleculas/RutaRecorrida'

interface Props {
  rutas: { link: string; token: string; nombre: string }[]
  userToken: string
}

const PerfilRutasRecorridas = ({ rutas, userToken }: Props) => {
  return (
    <View style={tw`mx-4 mt-2`}>
      <CustomText style={TEXT_COLORS.PRIMARY_BLUE}>Mis Rutas</CustomText>

      <View style={tw`flex flex-row flex-wrap items-center mt-3`}>
        {rutas && rutas.length > 0 ? (
          rutas?.map((ruta) => (
            <Gap px="[1px]" py="[1px]" styles="w-1/3 h-24" key={ruta.token}>
              <RutaRecorrida
                icon={{ uri: ruta.link }}
                token={ruta.token}
                nombre={ruta.nombre}
                userToken={userToken}
              />
            </Gap>
          ))
        ) : (
          <Text style={tw`text-black text-opacity-40`}>
            No has participado en rutas con la comunidad
          </Text>
        )}
      </View>
    </View>
  )
}

export default PerfilRutasRecorridas
