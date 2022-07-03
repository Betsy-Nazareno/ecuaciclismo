import * as React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import tw from 'twrnc'
import useDebounce from '../../../hooks/useDebounce'
import SectionTitle from '../atomos/SectionTitle'
import ListConsejosHistoricos from '../moleculas/ListConsejosHistoricos'
import SearchBar from '../moleculas/SearchBar'

const HistorialConsejos = () => {
  const [text, setText] = React.useState('')
  const debouncedText = useDebounce<string>(text)

  return (
    <ScrollView style={tw`px-2 pt-4`}>
      <SectionTitle text="Historial Consejos" />
      <SearchBar text={text} setText={setText} />
      <ListConsejosHistoricos text={debouncedText} />
    </ScrollView>
  )
}

export default HistorialConsejos
