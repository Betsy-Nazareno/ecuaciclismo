import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BuildUniqueFiltro } from '../models/Etiqueta.model'

interface BusquedaRutas {
  buildFiltros: BuildUniqueFiltro
}

const initialState: BusquedaRutas = {
  buildFiltros: { fecha: undefined, etiqueta: '' },
}

export const BusquedaRutas = createSlice({
  name: 'busquedaRutas',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<{ fecha: number | undefined }>) => {
      state.buildFiltros.fecha = action.payload.fecha
    },
    setEtiquetas: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload
      const { etiqueta } = state.buildFiltros
      if (etiqueta === name) {
        state.buildFiltros.etiqueta = ''
      } else {
        state.buildFiltros.etiqueta = name
      }
    },
  },
})

export const { setDate, setEtiquetas } = BusquedaRutas.actions

export default BusquedaRutas.reducer
