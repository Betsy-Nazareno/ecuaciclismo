import * as React from 'react'
import tw from 'twrnc'
import { View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import HeaderRoundedContainer from '../../moleculas/HeaderRoundedContainer'
import SectionTitle from '../../moleculas/SectionTitle'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import BarraFiltros from '../../organismos/BarraFiltros'
import { etiquetasRutas } from '../../../utils/constants'

const RutasFeedHeader = () => {
  const { user } = useSelector((state: RootState) => state.user)
  const [isAdmin, setIsAdmin] = React.useState(false)
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()

  React.useEffect(() => {
    setIsAdmin(user?.admin || false)
  }, [])

  const icon = isAdmin
    ? require('../../../../assets/plus.png')
    : require('../../../../assets/raise_hand_icon.png')

  const iconDimension = isAdmin ? 18 : 30

  return (
    <HeaderRoundedContainer>
      <View style={tw`mx-4`}>
        <SectionTitle
          text="Rutas"
          styleText="text-3xl"
          background={false}
          hasButton
          buttonIcon={icon}
          iconDimension={iconDimension}
          handleClickButton={() => navigation.navigate('PublicacionFormulario')}
        />
      </View>
      <BarraFiltros filtros={etiquetasRutas} icons={false} />
    </HeaderRoundedContainer>
  )
}

export default RutasFeedHeader
