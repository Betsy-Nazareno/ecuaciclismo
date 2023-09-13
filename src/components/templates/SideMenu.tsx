import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer'
import * as React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { BACKGROUND_COLORS } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'twrnc'
import { RootStackParamList, Screens, ScreensDrawer } from '../../models/Screens.types'
import { setActiveTab } from '../../redux/drawerTabs'
import OptionSideMenu from '../atomos/OptionSideMenu'
import Ruler from '../atomos/Ruler'
import UserInformation from '../moleculas/UserInformation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootState } from '../../redux/store'

const SideMenu = (props: DrawerContentComponentProps) => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NavigationProp<RootStackParamList, Screens>>()
  const {user} = useSelector((state: RootState) => state.user)
  const handleClick = (tab: ScreensDrawer) => {
    dispatch(setActiveTab({ activeTab: tab }))
    props.navigation.navigate(tab)
  }

  const verifyPendingForm = async (key: string, pending: string, notPending: string) => {
      try {
        const jsonValue = await AsyncStorage.getItem(key)
        jsonValue != null ? handleClick(pending) : handleClick(notPending)
      } catch (e) {
        console.error(e)
      }
  }
  const handlePress = () => {
    return navigation.navigate('Perfil', { userToken: user?.id_usuario})
  }
  return (
    <DrawerContentScrollView {...props}>
      <View style={[tw`flex flex-row items-center pl-4`, styles.container]}>
        <Pressable onPress={handlePress}>
        <UserInformation />
        </Pressable>
      </View>

      <View style={tw`mt-2 mb-5`}>
        <View>
          <OptionSideMenu
            label="Inicio"
            name="Inicio"
            source={require('../../../assets/home_blue_icon.png')}
            handleClick={() => handleClick('Inicio')}
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
            name="HistorialConsejos"
            source={require('../../../assets/consejo_blue_icon.png')}
            handleClick={() => handleClick('HistorialConsejos')}
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

        <View>
          <OptionSideMenu
            label="Contactenos"
            name="Contactenos"
            source={require('../../../assets/contactenos.png')}
            handleClick={() => handleClick('Contactenos')}
          />
          <Ruler style="w-11/12 bg-[#e6e6e6] mx-auto" />
        </View>

        <View>
          <OptionSideMenu
            label="Seguridad"
            name="Seguridad"
            source={require('../../../assets/seguridad.png')}
            handleClick={() => handleClick('Seguridad')}
          />
          <Ruler style="w-11/12 bg-[#e6e6e6] mx-auto" />
        </View>
        <View>
          <OptionSideMenu
            label="Lugares"
            name="Lugares"
            source={require('../../../assets/lugares.png')}
            handleClick={() => handleClick('Lugares')}
          />
          <Ruler style="w-11/12 bg-[#e6e6e6] mx-auto" />
        </View>
        <View>
          <OptionSideMenu
            label="Solicitudes"
            name="Solicitudes"
            source={require('../../../assets/solicitud.png')}
            handleClick={() => handleClick('Solicitudes')}
          />
          <Ruler style="w-11/12 bg-[#e6e6e6] mx-auto" />
        </View>
      </View>

      <View style={tw`flex flex-col items-center justify-center`}>
        <Pressable
          style={tw`${BACKGROUND_COLORS.ORANGE} rounded-3xl p-2 mb-4 w-30 items-center`}
          onPress={() => verifyPendingForm('registro-local-seguro-key', 'DescargarSubirPDF', 'RegistroLocalSeguro')}
        >
          <Text style={tw`font-bold text-white`}>Registrar local</Text>
        </Pressable>

        {(user?.tipo === 'Verificado') ? (
          <Pressable
            style={tw`${BACKGROUND_COLORS.ORANGE} rounded-3xl p-2 mb-8 w-30 items-center`}
            onPress={()=> verifyPendingForm('registro-miembro-key', 'PaginaDescargaMiembro', 'RegistroMiembro')}
          >
            <Text style={tw`font-bold text-white`}>Ser miembro</Text>
          </Pressable>
        ) : (
          <Pressable
            style={tw`${BACKGROUND_COLORS.ORANGE} rounded-3xl p-2 mb-8 w-30 items-center`}
            onPress={()=> navigation.navigate('RegistroVerificado')}
          >
            <Text style={tw`font-bold text-white`}>Verificar cuenta</Text>
          </Pressable>
        )}
      </View>

    </DrawerContentScrollView>
  )
}

export default SideMenu

const styles = StyleSheet.create({
  container: { backgroundColor: '#2D84C4', height: 70, marginTop: -4 },
})
