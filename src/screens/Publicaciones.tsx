import React from 'react'
import { View } from 'react-native'
import BasePaginas from '../components/templates/BasePaginas'
import tw from 'twrnc'
import HeaderRoundedContainer from '../components/moleculas/HeaderRoundedContainer'
import SectionTitle from '../components/moleculas/SectionTitle'
import SearchBar from '../components/moleculas/SearchBar'
import BarraFiltros from '../components/moleculas/BarraFiltros'

const Publicaciones = () => {
  return (
    <BasePaginas>
      {/**Separar en un organismo */}
      <HeaderRoundedContainer>
        <View style={tw`mx-4`}>
          <SectionTitle
            text="Publicaciones"
            background={false}
            hasButton
            buttonIcon={require('../../assets/edit_white_icon.png')}
            handleClickButton={() => {
              return
            }}
          />
          <SearchBar
            text=""
            setText={() => {
              return
            }}
          />
        </View>
        <BarraFiltros />
      </HeaderRoundedContainer>
    </BasePaginas>
  )
}

export default Publicaciones
