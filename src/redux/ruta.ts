import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Ruta } from '../models/Rutas'

interface RutaSlice {
  rutaHasModified?: boolean
  rutasPropuestas?: Ruta[]
  rutasFeed?: Ruta[]
  allRutas?: Ruta[]
}

const initialState: RutaSlice = {
  rutaHasModified: false,
  rutasPropuestas: [],
  rutasFeed: [],
  allRutas: [],
}

export const Rutas = createSlice({
  name: 'ruta',
  initialState,
  reducers: {
    setRutaHasModified: (state, action: PayloadAction<RutaSlice>) => {
      state.rutaHasModified = action.payload.rutaHasModified
    },
    setRutasPropuestas: (state, action: PayloadAction<RutaSlice>) => {
      state.rutasPropuestas = action.payload.rutasPropuestas
    },
    setRutasFeed: (state, action: PayloadAction<RutaSlice>) => {
      state.rutasFeed = action.payload.rutasFeed
    },
    setAllRutas: (state, action: PayloadAction<RutaSlice>) => {
      state.allRutas = action.payload.allRutas
    },
  },
})

export const {
  setRutaHasModified,
  setRutasPropuestas,
  setRutasFeed,
  setAllRutas,
} = Rutas.actions

export default Rutas.reducer
