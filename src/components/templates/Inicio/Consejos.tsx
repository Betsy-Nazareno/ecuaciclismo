import * as React from 'react'
import { View } from 'react-native'
import tw from 'twrnc'
import TarjetaConsejo from './TarjetaConsejo'
import { BACKGROUND_COLORS } from '../../../utils/constants'
import { obtenerConsejosActuales } from '../../../lib/services/consejos.services'
import { RootState } from '../../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { Consejo } from '../../../models/Consejo.model'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import SectionTitle from '../../moleculas/SectionTitle'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import EmptyTarjetaConsejo from '../../organismos/EmptyTarjetaConsejo'
import { setActiveScreen } from '../../../redux/screens'

const Consejos = () => {
  const { authToken } = useSelector((state: RootState) => state.sesion)
  const { hasModified } = useSelector((state: RootState) => state.consejo)
  const [listaConsejos, setListaConsejos] = React.useState<Consejo[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
  const dispatch = useDispatch()

  React.useEffect(() => {
    let isMounted = true
    if (isMounted) {
      ;(async () => {
        const response = await obtenerConsejosActuales(authToken as string)
        setListaConsejos(response?.data)
        setIsLoading(false)
      })()
    }
    dispatch(setActiveScreen({ activeScreen: 'Inicio' }))
    return () => {
      isMounted = false
    }
  }, [hasModified])

  return (
    <View style={tw`px-2`}>
      <View style={tw`mt-[2%] ${BACKGROUND_COLORS.BLUE_LIGHTER}`}>
        <SectionTitle
          text={'Consejos del día'}
          hasUpdates
          hasButton
          buttonIcon={require('../../../../assets/plus.png')}
          handleClickButton={() => navigation.navigate('ConsejoFormulario')}
        />
      </View>
      <View style={tw`mt-[4%] mb-8`}>
        {isLoading ? (
          <EmptyTarjetaConsejo />
        ) : (
          listaConsejos?.map((consejo, index) => {
            return <TarjetaConsejo key={index} consejoProp={consejo} />
          })
        )}
      </View>
    </View>
  )
}

export default Consejos
