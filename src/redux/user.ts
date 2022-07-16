import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, UserSession } from '../models/User'

interface UserSlice {
  user: User | null
  authToken: string | null
}

const initialState: UserSlice = {
  user: null,
  authToken: null,
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
  },
})

export const { iniciarSesion, cerrarSesion } = Auth.actions

export default Auth.reducer
