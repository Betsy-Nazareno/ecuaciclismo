import { NavigationProp, useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import tw from 'twrnc'
import useDebounce from '../../../hooks/useDebounce'
import {
  RootDrawerParamList,
  ScreensDrawer,
} from '../../../models/Screens.types'
import SectionTitle from '../atomos/SectionTitle'
import ListaNovedadesHistoricas from '../moleculas/ListaNovedadesHistoricas'
import SearchBar from '../moleculas/SearchBar'

const HistorialNovedades = () => {
  const [text, setText] = React.useState('')
  const debouncedText = useDebounce<string>(text)
  const navigation =
    useNavigation<NavigationProp<RootDrawerParamList, ScreensDrawer>>()

  return (
    <ScrollView style={tw`px-2 pt-4`}>
      <SectionTitle
        text="Historial Novedades"
        hasButton
        buttonIcon={require('../../../assets/edit_white_icon.png')}
        handleClickButton={() => navigation.navigate('Publicaciones')}
      />
      <SearchBar text={text} setText={setText} />
      <ListaNovedadesHistoricas text={debouncedText} />
    </ScrollView>
  )
}

export default HistorialNovedades
