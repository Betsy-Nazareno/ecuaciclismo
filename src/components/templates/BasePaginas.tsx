import React, { ReactNode } from 'react'
import tw from 'twrnc'
import {
  Animated,
  RefreshControl,
  ScrollView,
  StatusBar,
  View,
} from 'react-native'
import NavigationBar from '../moleculas/NavigationBar'
import { BACKGROUND_COLORS } from '../../utils/constants'

interface Props {
  children: ReactNode | ReactNode[]
  stickyIndexes?: number[]
  handleRefresh?: () => void
  backgroundColor?: string
}

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

const BasePaginas = ({
  children,
  stickyIndexes,
  backgroundColor,
  handleRefresh,
}: Props) => {
  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = () => {
    setRefreshing(true)
    handleRefresh?.()
    wait(1000).then(() => setRefreshing(false))
  }

  const AnimatedNavbar = new Animated.Value(0)
  const NAVBAR_MAX_HEIGHT = 65
  const NAVBAR_MIN_HEIGHT = 0

  const animateNavbarHeight = AnimatedNavbar.interpolate({
    inputRange: [0, NAVBAR_MAX_HEIGHT - NAVBAR_MIN_HEIGHT],
    outputRange: [NAVBAR_MAX_HEIGHT, NAVBAR_MIN_HEIGHT],
    extrapolate: 'clamp',
  })

  return (
    <View
      style={tw`relative h-full ${
        backgroundColor || BACKGROUND_COLORS.BLUE_LIGHTER
      }`}
    >
      <StatusBar backgroundColor={'#2D84C4'} />
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: AnimatedNavbar } } }],
          { useNativeDriver: false }
        )}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={stickyIndexes || []}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
