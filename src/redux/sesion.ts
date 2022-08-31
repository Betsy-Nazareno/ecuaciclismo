import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface sesionSlice {
  authToken: string | null
  email: string
}

const initialState: sesionSlice = {
  authToken: null,
  email: '',
}

export const Sesion = createSlice({
  name: 'sesion',
  initialState,
  reducers: {
    iniciarSesion: (state, action: PayloadAction<any>) => {
      state.authToken = action.payload.token
      state.email = action.payload.email
    },
    cerrarSesion: (state) => {
      state.authToken = null
      state.email = ''
    },
  },
})

export const { iniciarSesion, cerrarSesion } = Sesion.actions

export default Sesion.reducer
