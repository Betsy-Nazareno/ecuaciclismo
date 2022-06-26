import React, { ReactNode } from 'react'
import tw from 'twrnc'
import { Animated, ScrollView, StatusBar, View } from 'react-native'
import NavigationBar from '../moleculas/NavigationBar'
import { BACKGROUND_COLORS } from '../../../utils/constants'

interface Props {
  children: ReactNode | ReactNode[]
}

const BasePaginas = ({ children }: Props) => {
  const AnimatedNavbar = new Animated.Value(0)
  const NAVBAR_MAX_HEIGHT = 50
  const NAVBAR_MIN_HEIGHT = 0

  const animateNavbarHeight = AnimatedNavbar.interpolate({
    inputRange: [0, NAVBAR_MAX_HEIGHT - NAVBAR_MIN_HEIGHT],
    outputRange: [NAVBAR_MAX_HEIGHT, NAVBAR_MIN_HEIGHT],
    extrapolate: 'clamp',
  })

  return (
    <View style={tw`relative h-full ${BACKGROUND_COLORS.BLUE_LIGHTER}`}>
      <StatusBar backgroundColor={'#2D84C4'} />
      <ScrollView
        style={tw`px-2`}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: AnimatedNavbar } } }],
          { useNativeDriver: false }
        )}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
      <Animated.View
        style={[{ height: animateNavbarHeight, backgroundColor: '#FA0000' }]}
      >
        <NavigationBar />
      </Animated.View>
    </View>
  )
}

export default BasePaginas
