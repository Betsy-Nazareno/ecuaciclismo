import * as React from 'react'
import tw from 'twrnc'
import { View } from 'react-native'
import HeaderRoundedContainer from '../../moleculas/HeaderRoundedContainer'
import SectionTitle from '../../moleculas/SectionTitle'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import LinkedBadges from '../../moleculas/LinkedBadges'
import { BACKGROUND_COLORS, tiposRuta } from '../../../utils/constants'
import Badge from '../../moleculas/Badge'
import Gap from '../../atomos/Gap'

export const ESTADO_RUTA = {
  CURSO: 'En curso',
  FINALIZADAS: 'Finalizada',
  DISPONIBLES: 'Disponible',
  NOCUPOS: 'Sin cupos',
  INSCRITAS: 'inscritas',
}

const RutaDetalleHeader = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()

  const getColorBadge = (estado: string) => {
    switch (estado) {
      case ESTADO_RUTA.CURSO:
      case ESTADO_RUTA.DISPONIBLES:
        return BACKGROUND_COLORS.PRIMARY_BLUE
      case ESTADO_RUTA.FINALIZADAS:
        return BACKGROUND_COLORS.GRAY
      case ESTADO_RUTA.INSCRITAS:
        return BACKGROUND_COLORS.GREEN_PRIMARY
      case ESTADO_RUTA.NOCUPOS:
        return BACKGROUND_COLORS.RED
      default:
        return BACKGROUND_COLORS.PRIMARY_BLUE
    }
  }
  return (
    <HeaderRoundedContainer>
      <View style={tw`mx-4`}>
        <SectionTitle
          text="Salinas"
          styleText="text-3xl"
          background={false}
          hasButton
          isRestricted={false}
          buttonIcon={require('../../../../assets/rastreo_icon.png')}
          iconDimension={22}
          handleClickButton={() => navigation.navigate('InicioRastreo')}
        />
      </View>
      <View style={tw`py-5`}>
        <LinkedBadges etiquetas={tiposRuta} tipo="rounded">
          <Gap px="1">
            <Badge
              name={'en_curso'}
              label={'En curso'}
              backgroundColor={getColorBadge('En curso')}
              handleClick={() => navigation.navigate('FinalRuta')}
            />
          </Gap>
        </LinkedBadges>
      </View>
    </HeaderRoundedContainer>
  )
}

export default RutaDetalleHeader
