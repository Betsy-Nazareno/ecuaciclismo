import * as React from 'react'
import tw from 'twrnc'
import {  View, Image, Pressable} from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../models/Screens.types'
import { RutaCoordinadas } from '../../models/Alertas'
import { TEXT_COLORS } from '../../utils/constants'
import { CustomText } from '../atomos/CustomText'
import Ruler from '../atomos/Ruler'

interface MenuAlertasProps {
  visible: boolean
  ubicacion: RutaCoordinadas
  setVisible?: (visible: boolean) => void
}

const MenuAlertaRuta = ({visible, ubicacion}: MenuAlertasProps) => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()


  const handleVerAlerta = () => {
    navigation.navigate('Alertas')
    
  }

  const handleCrearAlerta = () => {
    navigation.navigate('AlertaFormulario', { data: ubicacion })

    console.log('ubicacion: ', ubicacion)
    
  }

  if (!visible) {
    return null;
  }

  return (
     
<View
      style={tw`absolute top-5 right-12 bg-white z-40 py-1 rounded-lg shadow-md w-44`}
    >
          <Pressable onPress={handleVerAlerta}
          >
            <View style={tw`flex flex-row items-center py-4 px-8`}>
              <Image
                source={require('../../../assets/mis_alertas.png')}
                style={{ width: 20, height: 20, marginRight: 16 }}
              />
              <CustomText
                style={`${TEXT_COLORS.DARK_BLUE} font-semibold text-sm`}
              >
                Ver mis alertas
              </CustomText>
            </View>
          </Pressable>
          <Ruler style="w-11/12 mx-auto" />
  

      <Pressable onPress={handleCrearAlerta}>
        <View style={tw`flex flex-row items-center py-4 px-8 `}>
          <Image
            source={require('../../../assets/crear_alerta.png')}
            style={{ width: 20, height: 20, marginRight: 16 }}
          />
          <CustomText style={`${TEXT_COLORS.DARK_BLUE} font-semibold text-sm`}>
            Crear alerta
          </CustomText>
        </View>
      </Pressable>
    </View>
  )
}

export default MenuAlertaRuta
