import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import tw from 'twrnc'
import { ScreensDrawer } from '../../../models/Screens.types'
import { setActiveTab } from '../../../redux/drawerTabs'
import OptionSideMenu from '../atomos/OptionSideMenu'
import Ruler from '../atomos/Ruler'
import UserInformation from '../atomos/UserInformation'

const SideMenu = (props: DrawerContentComponentProps) => {
  const dispatch = useDispatch()

  const handleClick = (tab: ScreensDrawer) => {
    dispatch(setActiveTab({ activeTab: tab }))
    props.navigation.navigate(tab)
  }

  return (
    <DrawerContentScrollView {...props}>
      <View style={[tw`flex flex-row items-center pl-4`, styles.container]}>
        <UserInformation />
      </View>
      {/* <DrawerItemList {...props} /> */}
      <View style={tw`mt-2`}>
        <View>
          <OptionSideMenu
            label="Inicio"
            name="HomeStack"
            source={require('../../../assets/home_blue_icon.png')}
            handleClick={() => handleClick('HomeStack')}
          />
          <Ruler style="w-11/12 bg-[#e6e6e6] mx-auto" />
        </View>

        <View>
          <OptionSideMenu
            label="Comunidad"
            name="Comunidad"
            source={require('../../../assets/comunidad_icon.png')}
            handleClick={() => handleClick('Comunidad')}
          />
          <Ruler style="w-11/12 bg-[#e6e6e6] mx-auto" />
        </View>

        <View>
          <OptionSideMenu
            label="Consejos"
            name="Consejos"
            source={require('../../../assets/consejo_blue_icon.png')}
            handleClick={() => handleClick('Consejos')}
          />
          <Ruler style="w-11/12 bg-[#e6e6e6] mx-auto" />
        </View>

        <View>
          <OptionSideMenu
            label="Novedades"
            name="Novedades"
            source={require('../../../assets/novedades_icon.png')}
            handleClick={() => handleClick('Novedades')}
          />
          <Ruler style="w-11/12 bg-[#e6e6e6] mx-auto" />
        </View>
      </View>
    </DrawerContentScrollView>
  )
}

export default SideMenu

const styles = StyleSheet.create({
  container: { backgroundColor: '#2D84C4', height: 70, marginTop: -4 },
})
