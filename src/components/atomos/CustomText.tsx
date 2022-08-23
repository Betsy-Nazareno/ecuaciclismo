import React, { useEffect, useState } from 'react'
import { Text, TextStyle } from 'react-native'
import tw from 'twrnc'
import * as Font from 'expo-font'

interface Props {
  children: React.ReactText | React.ReactText[]
  style?: string
  containerProps?: TextStyle
}

export const CustomText = ({ children, style, containerProps }: Props) => {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  const _loadFontsAsync = async () => {
    await Font.loadAsync({
      Montserrat: require('../../../assets/fonts/Montserrat-Bold.ttf'),
    })
  }

  useEffect(() => {
    let isUnmounted = true
    _loadFontsAsync().then(() => {
      if (isUnmounted) setFontsLoaded(true)
    })
    return () => {
      isUnmounted = false
    }
  }, [])

  return fontsLoaded ? (
    <Text style={{ fontFamily: 'Montserrat', ...containerProps }}>
      <Text style={tw`${style || ''}`}>{children}</Text>
    </Text>
  ) : (
    <></>
  )
}
