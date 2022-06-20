import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { TouchableHighlight, View } from 'react-native'
import tw from 'twrnc'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import { ButtonTab } from '../atomos/ButtonTab'

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, Screens>
}

const NavigationBar = ({ navigation }: Props) => {
  return (
    <View
      style={tw`w-full absolute bottom-0 border-t-2 border-solid border-gray-200 bg-white`}
    >
      <View style={tw`flex flex-row justify-between p-[2%]`}>
        <TouchableHighlight
          activeOpacity={0.1}
          onPress={() => navigation.navigate('Inicio')}
          underlayColor="#E7F5FF"
          style={tw`w-1/4`}
        >
          <ButtonTab
            title="Inicio"
            srcImage={require('../../../assets/home_inactive_icon.png')}
          />
        </TouchableHighlight>

        <TouchableHighlight
          activeOpacity={0.1}
          underlayColor="#E7F5FF"
          onPress={() => navigation.navigate('Publicaciones')}
          style={tw`w-1/4`}
        >
          <ButtonTab
            title="Noticias"
            srcImage={require('../../../assets/publicaciones_inactive_icon.png')}
          />
        </TouchableHighlight>

        <TouchableHighlight
          activeOpacity={0.1}
          underlayColor="#E7F5FF"
          onPress={() => navigation.navigate('Rutas')}
          style={tw`w-1/4`}
        >
          <ButtonTab
            title="Rutas"
            srcImage={require('../../../assets/rutas_inactive_icon.png')}
          />
        </TouchableHighlight>

        <TouchableHighlight
          activeOpacity={0.1}
          underlayColor="#E7F5FF"
          onPress={() => navigation.navigate('Perfil')}
          style={tw`w-1/4`}
        >
          <ButtonTab
            title="Perfil"
            srcImage={require('../../../assets/perfil_inactive_icon.png')}
          />
        </TouchableHighlight>
      </View>
    </View>
  )
}

export default NavigationBar
