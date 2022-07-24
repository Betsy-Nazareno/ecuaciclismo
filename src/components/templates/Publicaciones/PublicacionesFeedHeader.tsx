import { NavigationProp, useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { View } from 'react-native'
import tw from 'twrnc'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import HeaderRoundedContainer from '../../moleculas/HeaderRoundedContainer'
import SearchBar from '../../moleculas/SearchBar'
import SectionTitle from '../../moleculas/SectionTitle'
import BarraFiltros from '../../organismos/BarraFiltros'

const filtros = [
  {
    icon: require('../../../../assets/calendar.png'),
    value: 'fecha',
    label: 'Fecha',
  },
  {
    icon: require('../../../../assets/peligro_icon.png'),
    value: 'peligro',
    label: 'Peligro',
  },
  {
    icon: require('../../../../assets/celebracion_icon.png'),
    value: 'celebraciones',
    label: 'Celebraciones',
  },
  {
    icon: require('../../../../assets/recomendacion_icon.png'),
    value: 'recomendaciones',
    label: 'Recomendaciones',
  },
]

const PublicacionesFeedHeader = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
  return (
    <HeaderRoundedContainer>
      <View style={tw`mx-4`}>
        <SectionTitle
          text="Publicaciones"
          styleText="text-3xl"
          background={false}
          hasButton
          buttonIcon={require('../../../../assets/edit_white_icon.png')}
          handleClickButton={() => navigation.navigate('PublicacionFormulario')}
        />
        <SearchBar
          text=""
          setText={() => {
            return
          }}
        />
      </View>
      <BarraFiltros filtros={filtros} />
    </HeaderRoundedContainer>
  )
}

export default PublicacionesFeedHeader
