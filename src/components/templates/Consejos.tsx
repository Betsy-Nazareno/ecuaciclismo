import * as React from 'react'
import { View } from 'react-native'
import tw from 'twrnc'
import TarjetaConsejo from '../organismos/TarjetaConsejo'
import { BACKGROUND_COLORS } from '../../../utils/constants'
import { obtenerConsejos } from '../../../lib/services/consejos.services'
import { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux'
import { Consejo } from '../../../models/Consejo.model'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import SectionTitle from '../atomos/SectionTitle'
import RoundedButtonIcon from '../atomos/RoundedButtonIcon'
import { NavigationProp, useNavigation } from '@react-navigation/native'

const Consejos = () => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const { hasModified } = useSelector((state: RootState) => state.consejo)
  const [listaConsejos, setListaConsejos] = React.useState<Consejo[]>([])
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()

  React.useEffect(() => {
    ;(async () => {
      const response = await obtenerConsejos(
        authToken as string,
        'https://ecuaciclismoapp.pythonanywhere.com/api/consejodia/get_consejos_dia/'
      )
      setListaConsejos(response.data)
    })()
  }, [hasModified])

  return (
    <View>
      <View style={tw`mt-[6%] ${BACKGROUND_COLORS.BLUE_LIGHTER}`}>
        <SectionTitle text={'Consejos del día'} hasUpdates />
      </View>
      <View style={tw`mt-[4%]`}>
        {listaConsejos?.map((consejo, index) => {
          return (
            <TarjetaConsejo
              key={index}
              consejo={consejo}
              description="Administrador"
            />
          )
        })}
      </View>
      <View style={tw`mt-6`}>
        <SectionTitle text={'Novedades'} />
      </View>

      <View style={tw`absolute top-3 right-4 z-40`}>
        <RoundedButtonIcon
          handleClick={() => navigation.navigate('AgregarConsejo')}
          src={require('../../../assets/edit_white_icon.png')}
        />
      </View>
    </View>
  )
}

export default Consejos
