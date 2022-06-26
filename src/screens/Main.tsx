import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import Publicaciones from './Publicaciones'
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

const Stack = createNativeStackNavigator()

const Main = () => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const { setUser, isLoading } = useAuthentication()

  useEffect(() => {
    setUser()
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

  const MainStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#2D84C4' },
          headerTitle: Navbar,
          animation: 'none',
          // headerBackImageSource: require('../../assets/left-arrow.png'),
        }}
        initialRouteName="Inicio"
      >
        <Stack.Screen
          name="Inicio"
          component={Inicio}
          options={{ headerBackVisible: false }}
        />
        <Stack.Screen name="Publicaciones" component={Publicaciones} />
        <Stack.Screen name="Rutas" component={Rutas} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="AgregarConsejo" component={AgregarConsejo} />
      </Stack.Navigator>
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
