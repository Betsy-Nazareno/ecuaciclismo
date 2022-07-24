import { NavigationProp, useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'twrnc'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import { setText } from '../../../redux/publicacionBusqueda'
import { RootState } from '../../../redux/store'
import { etiquetasPublicaciones } from '../../../utils/constants'
import HeaderRoundedContainer from '../../moleculas/HeaderRoundedContainer'
import SearchBar from '../../moleculas/SearchBar'
import SectionTitle from '../../moleculas/SectionTitle'
import BarraFiltros from '../../organismos/BarraFiltros'

const PublicacionesFeedHeader = () => {
  const { text } = useSelector((state: RootState) => state.busqueda)
  const dispatch = useDispatch()
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()

  const handleText = (text: string) => {
    dispatch(setText({ text }))
  }
  return (
    <HeaderRoundedContainer>
      <View style={tw`mx-4`}>
        <SectionTitle
          text="Publicaciones"
          styleText="text-3xl"
          background={false}
          hasButton
          buttonIcon={require('../../../../assets/plus.png')}
          handleClickButton={() => navigation.navigate('PublicacionFormulario')}
        />
        <SearchBar text={text} setText={handleText} />
      </View>
      <BarraFiltros filtros={etiquetasPublicaciones} />
    </HeaderRoundedContainer>
  )
}

export default PublicacionesFeedHeader
