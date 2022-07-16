import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
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

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const Main = () => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const { setUser, isLoading } = useAuthentication()

  useEffect(() => {
    let mounted = true
    if (mounted) {
      setUser()
    }
    return () => {
      mounted = false
    }
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
        <Stack.Screen
          name="Inicio"
          component={Inicio}
          options={{ headerBackVisible: false }}
        />
        <Stack.Screen name="DetalleNovedad" component={DetalleNovedad} />
        <Stack.Screen name="Rutas" component={Rutas} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Publicaciones" component={Publicaciones} />
        <Stack.Screen name="NovedadFormulario" component={NovedadFormulario} />
        <Stack.Screen name="ConsejoFormulario" component={ConsejoFormulario} />
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
      {authToken ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default Main
