import * as React from 'react'
import { View } from 'react-native'
import tw from 'twrnc'
import TarjetaConsejo from '../organismos/TarjetaConsejo'
import { BACKGROUND_COLORS } from '../../../utils/constants'
import { obtenerConsejosActuales } from '../../../lib/services/consejos.services'
import { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux'
import { Consejo } from '../../../models/Consejo.model'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import SectionTitle from '../atomos/SectionTitle'
import { NavigationProp, useNavigation } from '@react-navigation/native'

const Consejos = () => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const { hasModified } = useSelector((state: RootState) => state.consejo)
  const [listaConsejos, setListaConsejos] = React.useState<Consejo[]>([])
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()

  React.useEffect(() => {
    let isMounted = true
    if (isMounted) {
      ;(async () => {
        const response = await obtenerConsejosActuales(authToken as string)
        setListaConsejos(response.data)
      })()
    }
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
          buttonIcon={require('../../../assets/edit_white_icon.png')}
          handleClickButton={() => navigation.navigate('AgregarConsejo')}
        />
      </View>
      <View style={tw`mt-[4%]`}>
        {listaConsejos?.map((consejo, index) => {
          return <TarjetaConsejo key={index} consejoProp={consejo} />
        })}
      </View>
    </View>
  )
}

export default Consejos
