import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/atomos/Navbar'
import Inicio from './Inicio'
import Rutas from './Rutas'
import Perfil from './Perfil'
import Login from './Login'
import Registro from './Registro'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useAuthentication } from '../hooks/useAuthentication'
import Spinner from '../components/atomos/Spinner'
import ConsejoFormulario from './ConsejoFormulario'
import NovedadFormulario from './NovedadFormulario'
import DetalleNovedad from './DetalleNovedad'
import { createDrawerNavigator } from '@react-navigation/drawer'
import SideMenu from '../components/templates/SideMenu'
import Comunidad from './Comunidad'
import Consejos from './HistorialConsejos'
import Novedades from './HistorialNovedades'
import ConsejoDetalle from './ConsejoDetalle'
import Publicaciones from './Publicaciones'
import DetallePublicacion from './DetallePublicacion'
import PublicacionFormulario from './PublicacionFormulario'
import RutasFormulario from './RutasFormulario'
import DetalleRuta from './DetalleRuta'
import InicioRastreo from './InicioRastreo'
import RastreoUbicacion from '../components/templates/RastreoRutas/RastreoUbicacion'
import RutaIncompleta from './RutaIncompleta'
import FinalRuta from './FinalRuta'
import PerfilFormulario from './PerfilFormulario'
import SafeHomeModal from '../components/organismos/SafeHomeModal'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const Main = () => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const { setUser, isLoading } = useAuthentication()
  const [showSafeHome, setShowSafeHome] = useState(false)

  useEffect(() => {
    setUser()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setShowSafeHome(true)
    }, 3000)
  }, [])

  const AuthStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />
      </Stack.Navigator>
    )
  }

  const HomeStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
        initialRouteName="Inicio"
      >
        <Stack.Screen name="Rutas" component={Rutas} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="DetalleNovedad" component={DetalleNovedad} />
        <Stack.Screen name="Publicaciones" component={Publicaciones} />
        <Stack.Screen name="NovedadFormulario" component={NovedadFormulario} />
        <Stack.Screen name="ConsejoFormulario" component={ConsejoFormulario} />
        <Stack.Screen name="DetalleRuta" component={DetalleRuta} />
        <Stack.Screen name="InicioRastreo" component={InicioRastreo} />
        <Stack.Screen name="RastreoUbicacion" component={RastreoUbicacion} />
        <Stack.Screen name="RutaIncompleta" component={RutaIncompleta} />
        <Stack.Screen name="FinalRuta" component={FinalRuta} />
        <Stack.Screen name="PerfilFormulario" component={PerfilFormulario} />
        <Stack.Screen
          name="PublicacionFormulario"
          component={PublicacionFormulario}
        />
        <Stack.Screen name="RutasFormulario" component={RutasFormulario} />
        <Stack.Screen
          name="Inicio"
          component={Inicio}
          options={{ headerBackVisible: false }}
        />
        <Stack.Screen
          name="DetallePublicacion"
          component={DetallePublicacion}
        />
      </Stack.Navigator>
    )
  }

  const MainStack = () => {
    return (
      <Drawer.Navigator
        drawerContent={SideMenu}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2D84C4',
            height: 70,
          },
          headerTitle: Navbar,
        }}
        initialRouteName="HomeStack"
        backBehavior="history"
      >
        <Drawer.Screen name="HomeStack" component={HomeStack} />
        <Drawer.Screen name="Comunidad" component={Comunidad} />
        <Drawer.Screen name="HistorialConsejos" component={Consejos} />
        <Drawer.Screen name="ConsejoDetalle" component={ConsejoDetalle} />
        <Drawer.Screen name="DetalleNovedad" component={DetalleNovedad} />
        <Drawer.Screen name="Novedades" component={Novedades} />
      </Drawer.Navigator>
    )
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <NavigationContainer>
      {authToken ? (
        <>
          <SafeHomeModal visible={showSafeHome} setVisible={setShowSafeHome} />
          <MainStack />
        </>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  )
}

export default Main
