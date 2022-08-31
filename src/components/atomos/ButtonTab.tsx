import { NavigationProp, useNavigation } from '@react-navigation/native'
import React, { ReactNode } from 'react'
import { Pressable, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'twrnc'
import { RootStackParamList, Screens } from '../../models/Screens.types'
import { setActiveScreen } from '../../redux/screens'
import { RootState } from '../../redux/store'
import { BACKGROUND_COLORS } from '../../utils/constants'

interface Props {
  children: ReactNode
  screen: Screens
  param?: any
}

export const ButtonTab = ({ children, screen, param }: Props) => {
  const { activeScreen } = useSelector((state: RootState) => state.screens)
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
  const dispatch = useDispatch()

  const handleChangeScreen = () => {
    dispatch(setActiveScreen({ activeScreen: screen }))
    if (param) {
      navigation.navigate(screen, param)
    } else {
      navigation.navigate(screen)
    }
  }

  const isActiveScreen = () => screen === activeScreen
  return (
    <Pressable onPress={handleChangeScreen} style={tw`w-1/4`}>
      <View>
        <View style={tw`flex flex-col items-center`}>{children}</View>
        <View style={tw`mt-[4%] h-1 w-6/12 mx-auto`}>
          {isActiveScreen() && (
            <View
              style={tw`rounded-3xl ${BACKGROUND_COLORS.ORANGE} w-full h-full`}
            />
          )}
        </View>
      </View>
    </Pressable>
  )
}
