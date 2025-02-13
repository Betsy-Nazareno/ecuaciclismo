import * as React from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'twrnc'
import { setText } from '../../../redux/publicacionBusqueda'
import { RootState } from '../../../redux/store'
import { tipoSolicitudes } from '../../../utils/constants'
import HeaderRoundedContainer from '../../moleculas/HeaderRoundedContainer'
import SearchBar from '../../moleculas/SearchBar'
import SectionTitle from '../../moleculas/SectionTitle'
import BarraFiltrosUsers from '../../organismos/BarraFiltrosUsers'

const SolicitudesHeader = () => {
  const { text } = useSelector((state: RootState) => state.busqueda)
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.user)

  const handleText = (text: string) => {
    dispatch(setText({ text }))
  }
  // Utiliza useEffect para cargar datos iniciales o realizar acciones cuando el componente se monta o se actualiza.
  React.useEffect(() => {
    console.log('Componente SolicitudesHeader se montó o se actualizó.');
  }, []);

  return (
    <HeaderRoundedContainer>
      <View style={tw`mx-4`}>
        <SectionTitle
          text="Solicitudes"
          styleText="text-3xl"
          background={false}
        />
        {user?.admin && <SearchBar text={text} setText={handleText} />}
        
      </View>
      {user?.admin && <BarraFiltrosUsers filtros={tipoSolicitudes} />}
      
    </HeaderRoundedContainer>
  )
}

export default SolicitudesHeader