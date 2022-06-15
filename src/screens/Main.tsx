import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Publicaciones from './Publicaciones'
import Navbar from '../components/atomos/Navbar'
import Consejos from './Consejos'
import Rutas from './Rutas'
import Perfil from './Perfil'
import Login from './Login'
import Registro from './Registro'

const Stack = createNativeStackNavigator()

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#2D84C4' },
          headerTitle: Navbar,
          // headerBackImageSource: require('../../assets/left-arrow.png'),
        }}
        initialRouteName="Login"
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registro"
          component={Registro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Inicio"
          component={Consejos}
          options={{ headerBackVisible: false }}
        />
        <Stack.Screen name="Publicaciones" component={Publicaciones} />
        <Stack.Screen name="Rutas" component={Rutas} />
        <Stack.Screen name="Perfil" component={Perfil} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Main
