import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import React from 'react'
import { Pressable, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import tw from 'twrnc'
import { RootStackParamList, Screens } from '../../models/Screens.types'
import { setActiveScreen } from '../../redux/screens'

const Navbar = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
  const dispatch = useDispatch()
  const [fontsLoaded] = useFonts({
    Bungee: require('../../../assets/fonts/Bungee-Regular.ttf'),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <Pressable
      style={{ paddingVertical: 16 }}
      onPress={() => {
        navigation.navigate('Inicio')
        dispatch(setActiveScreen({ activeScreen: 'Inicio' }))
      }}
    >
      <Text style={{ fontFamily: 'Bungee', marginTop: 14 }}>
        <Text style={tw`text-[#F16F31] font-bold text-xl`}>
          ECUA
          <Text style={tw`text-white`}>CICLISMO</Text>
        </Text>
      </Text>
    </Pressable>
  )
}

export default Navbar
