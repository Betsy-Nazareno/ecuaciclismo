import { NavigationProp, useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'twrnc'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import { setText } from '../../../redux/publicacionBusqueda'
import { RootState } from '../../../redux/store'
import { etiquetasContactos, TEXT_COLORS, } from '../../../utils/constants'
import HeaderRoundedContainer from '../../moleculas/HeaderRoundedContainer'
import SearchBar from '../../moleculas/SearchBar'
import SectionTitle from '../../moleculas/SectionTitle'
import BarraFiltrosUsers from '../../organismos/BarraFiltrosUsers'

const ContactosHeader = () => {
  const { text } = useSelector((state: RootState) => state.busqueda)
  const dispatch = useDispatch()
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()

  const handleText = (text: string) => {
    dispatch(setText({ text }))
  }
  return (
    <>
      <HeaderRoundedContainer>
        <View style={tw`mx-4`}>
          <SectionTitle
            hasButton
            isRestricted={false}
            text="Contactos Seguros"
            styleText="text-3xl"
            background={false}
          />
          <SearchBar text={text} setText={handleText} />
        </View>
        <BarraFiltrosUsers filtros={etiquetasContactos} />
      </HeaderRoundedContainer>
      <View style={tw`justify-center items-center`}>
        <Pressable>
          <Text style={tw`text-sm mx-auto w-11/12 underline italic font-bold ${TEXT_COLORS.GRAY_PLACEHOLDER}`}>Agregar desde su dispositivo</Text>
        </Pressable>
      </View>
    </>
  )
}

export default ContactosHeader
