import React from 'react'
import { useFonts } from 'expo-font'
import { Text, TextStyle } from 'react-native'
import tw from 'twrnc'

interface Props {
  children: React.ReactText | React.ReactText[]
  style?: string
  containerProps?: TextStyle
}

export const CustomText = ({ children, style, containerProps }: Props) => {
  const [fontsLoaded] = useFonts({
    Montserrat: require('../../../assets/fonts/Montserrat-Bold.ttf'),
  })

  return fontsLoaded ? (
    <Text style={{ fontFamily: 'Montserrat', ...containerProps }}>
      <Text style={tw`${style || ''}`}>{children}</Text>
    </Text>
  ) : (
    <></>
  )
}
