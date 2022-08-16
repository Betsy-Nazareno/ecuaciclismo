import * as React from 'react'
import tw from 'twrnc'
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../models/Screens.types'

interface RutaRecorridaProps {
  style?: string
  icon: ImageSourcePropType
}

const RutaRecorrida = ({ icon, style = '' }: RutaRecorridaProps) => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
  return (
    <TouchableHighlight
      style={tw`relative ${style}`}
      onPress={() => navigation.navigate('FinalRuta')}
    >
      <>
        <Image
          source={icon}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
        <View
          style={tw`absolute bottom-0 bg-black w-full bg-opacity-50 py-1 pl-2`}
        >
          <Text style={tw`text-white font-bold text-xs`} numberOfLines={1}>
            Ruta salinas
          </Text>
        </View>
      </>
    </TouchableHighlight>
  )
}

export default RutaRecorrida
