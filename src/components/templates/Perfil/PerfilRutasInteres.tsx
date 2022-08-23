import * as React from 'react'
import tw from 'twrnc'
import { Text, View } from 'react-native'
import { CustomText } from '../../atomos/CustomText'
import { TEXT_COLORS } from '../../../utils/constants'
import Gap from '../../atomos/Gap'
import RoundedBadge from '../../moleculas/RoundedBadge'
import { catalogs } from '../../../models/Rutas'

interface Props {
  tipoRutas?: catalogs[]
}

const PerfilRutasInteres = ({ tipoRutas }: Props) => {
  return (
    <View style={tw`mx-4 mt-2`}>
      <CustomText style={TEXT_COLORS.PRIMARY_BLUE}>Rutas de Interés</CustomText>
      <View style={tw`flex flex-row flex-wrap mt-4`}>
        {tipoRutas && tipoRutas?.length > 0 ? (
          tipoRutas.map((tipo) => (
            <Gap px="1" py="1" key={tipo.token}>
              <RoundedBadge label={tipo.nombre} />
            </Gap>
          ))
        ) : (
          <Text style={tw`text-black text-opacity-40`}>
            No has agregado rutas de interés a tu perfil
          </Text>
        )}
      </View>
    </View>
  )
}

export default PerfilRutasInteres
