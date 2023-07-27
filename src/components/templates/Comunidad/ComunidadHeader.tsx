import * as React from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'twrnc'
import { setText } from '../../../redux/publicacionBusqueda'
import { RootState } from '../../../redux/store'
import { etiquetasUserTypes } from '../../../utils/constants'
import HeaderRoundedContainer from '../../moleculas/HeaderRoundedContainer'
import SearchBar from '../../moleculas/SearchBar'
import SectionTitle from '../../moleculas/SectionTitle'
import BarraFiltrosUsers from '../../organismos/BarraFiltrosUsers'

const ComunidadHeader = () => {
  const { text } = useSelector((state: RootState) => state.busqueda)
  const dispatch = useDispatch()

  const handleText = (text: string) => {
    dispatch(setText({ text }))
  }
  return (
    <HeaderRoundedContainer>
      <View style={tw`mx-4`}>
        <SectionTitle
          text="Comunidad"
          styleText="text-3xl"
          background={false}
        />
        <SearchBar text={text} setText={handleText} />
      </View>
      <BarraFiltrosUsers filtros={etiquetasUserTypes} />
    </HeaderRoundedContainer>
  )
}

export default ComunidadHeader
