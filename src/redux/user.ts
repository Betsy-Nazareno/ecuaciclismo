import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, UserSession } from '../models/User'

interface UserSlice {
  user: User | null
  authToken: string | null
  refreshUser: boolean
}

const initialState: UserSlice = {
  user: null,
  authToken: null,
  refreshUser: false,
}

export const Auth = createSlice({
  name: 'user',
  initialState,
  reducers: {
    iniciarSesion: (state, action: PayloadAction<UserSession>) => {
      const { token, user } = action.payload
      state.user = user
      state.authToken = token
    },
    cerrarSesion: (state) => {
      state.user = null
      state.authToken = null
    },
    actualizarUsuario: (state, action: PayloadAction<any>) => {
      state.refreshUser = action.payload.refreshUser
    },
  },
})

export const { iniciarSesion, cerrarSesion, actualizarUsuario } = Auth.actions

export default Auth.reducer
