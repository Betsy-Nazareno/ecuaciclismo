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
import { RootState } from '../../redux/store'
import { useAuthentication } from '../../hooks/useAuthentication'
import Spinner from '../components/atomos/Spinner'
import AgregarConsejo from './AgregarConsejo'
import AgregarPublicidad from './AgregarPublicidad'
import DetallePublicidad from './DetallePublicidad'
import 'react-native-gesture-handler'
import { createDrawerNavigator } from '@react-navigation/drawer'
import SideMenu from '../components/templates/SideMenu'
import Comunidad from './Comunidad'
import Consejos from './Consejos'
import Novedades from './Novedades'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const Main = () => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const { setUser, isLoading } = useAuthentication()

  useEffect(() => {
    let mounted = true
    mounted && setUser()
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
        <Stack.Screen name="Publicaciones" component={AgregarPublicidad} />
        <Stack.Screen name="DetallePublicidad" component={DetallePublicidad} />
        <Stack.Screen name="Rutas" component={Rutas} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="AgregarConsejo" component={AgregarConsejo} />
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
        <Drawer.Screen name="Consejos" component={Consejos} />
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
