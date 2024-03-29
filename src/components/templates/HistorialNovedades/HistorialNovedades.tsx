import * as React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import tw from 'twrnc'
import useDebounce from '../../../hooks/useDebounce'
import SectionTitle from '../../moleculas/SectionTitle'
import ListaNovedadesHistoricas from './ListaNovedadesHistoricas'
import SearchBar from '../../moleculas/SearchBar'

const HistorialNovedades = () => {
  const [text, setText] = React.useState('')
  const debouncedText = useDebounce<string>(text)

  return (
    <ScrollView style={tw`px-2 py-4`}>
      <SectionTitle text="Historial Novedades" />
      <SearchBar text={text} setText={setText} />
      <ListaNovedadesHistoricas text={debouncedText} />
    </ScrollView>
  )
}

export default HistorialNovedades
