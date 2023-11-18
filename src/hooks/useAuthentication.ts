import axios from 'axios'
import { useDispatch } from 'react-redux'
import { cerrarSesion, iniciarSesion } from '../redux/user'
import * as SecureStore from 'expo-secure-store'
import { Login } from '../models/User'
import { useState } from 'react'

export const useAuthentication = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

  const initUser = async (props: Login) => {
    const data = { user: { email: props.email, password: props.password } }
    try {
      const response = await axios.post(
        'https://ecuaciclismoapp.pythonanywhere.com/api/token-auth/',
        data
      )

      const {
        first_name,
        last_name,
        email,
        username,
        token,
        admin,
        foto,
        genero,
        peso,
        edad,
        nivel,
        id_usuario,
        tipo,
      } = response.data || {}

      const user = {
        first_name,
        last_name,
        email,
        username,
        admin,
        foto,
        genero,
        peso,
        edad,
        nivel,
        id_usuario,
        tipo,
      }

      dispatch(
        iniciarSesion({
          token,
          user,
        })
      )

      await SecureStore.setItemAsync('user', JSON.stringify({ token, user }))
    } catch (e) {
      throw new Error('Failed to Login')
    }
  }

  const setUser = async () => {

    const result = await SecureStore.getItemAsync('user')
    if (result) {
      const data = JSON.parse(result)
      dispatch(
        iniciarSesion({
          token: data.token,
          user: data.user,
        })
      )
    }
    setIsLoading(false)
  }

  const deleteUserStore = async () => {
    await SecureStore.deleteItemAsync('user')
    dispatch(cerrarSesion())
  }

  return { initUser, setUser, deleteUserStore, isLoading }
}
