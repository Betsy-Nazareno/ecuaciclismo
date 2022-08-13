import * as React from 'react'
import tw from 'twrnc'
import { View } from 'react-native'
import HeaderRoundedContainer from '../../moleculas/HeaderRoundedContainer'
import SectionTitle from '../../moleculas/SectionTitle'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import LinkedBadges from '../../moleculas/LinkedBadges'
import { BACKGROUND_COLORS } from '../../../utils/constants'
import Badge from '../../moleculas/Badge'
import Gap from '../../atomos/Gap'
import { EstadoRuta } from '../../../models/Rutas'

export const ESTADO_RUTA = {
  CURSO: 'En Curso',
  FINALIZADAS: 'Finalizada',
  DISPONIBLES: 'Disponible',
  NOCUPOS: 'Sin Cupos',
  INSCRITAS: 'inscritas',
}
interface RutaDetalleHeaderProps {
  nombre: string
  tiposRuta: any
  estado: EstadoRuta
  aprobada: boolean
}
const RutaDetalleHeader = ({
  nombre,
  tiposRuta,
  estado,
  aprobada,
}: RutaDetalleHeaderProps) => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()

  const getColorBadge = (estado: string) => {
    switch (estado) {
      case ESTADO_RUTA.CURSO:
        return BACKGROUND_COLORS.GREEN_PRIMARY
      case ESTADO_RUTA.DISPONIBLES:
        return BACKGROUND_COLORS.PRIMARY_BLUE
      case ESTADO_RUTA.FINALIZADAS:
        return `bg-black bg-opacity-80`
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
          text={nombre}
          styleText="text-3xl"
          background={false}
          hasButton={aprobada && estado === ESTADO_RUTA.CURSO}
          isRestricted={false}
          buttonIcon={require('../../../../assets/rastreo_icon.png')}
          iconDimension={22}
          handleClickButton={() => navigation.navigate('InicioRastreo')}
        />
      </View>
      <View style={tw`py-5`}>
        <LinkedBadges etiquetas={tiposRuta} tipo="rounded">
          {aprobada ? (
            <Gap px="1">
              <Badge
                name={'estado'}
                label={estado}
                backgroundColor={getColorBadge(estado)}
              />
            </Gap>
          ) : (
            <Gap px="1">
              <Badge
                name={'en_revision'}
                label={'Por aprobar'}
                backgroundColor={BACKGROUND_COLORS.ORANGE}
              />
            </Gap>
          )}
        </LinkedBadges>
      </View>
    </HeaderRoundedContainer>
  )
}

export default RutaDetalleHeader
