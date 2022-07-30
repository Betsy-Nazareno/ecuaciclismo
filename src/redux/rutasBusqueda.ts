import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BuildFiltro } from '../models/Etiqueta.model'

interface BusquedaRutas {
  buildFiltros: BuildFiltro
}

const initialState: BusquedaRutas = {
  buildFiltros: { fecha: undefined, etiquetas: [] },
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
      const { etiquetas } = state.buildFiltros
      if (etiquetas?.includes(name)) {
        const filteredEtiquetas = etiquetas.filter(
          (etiqueta) => etiqueta !== name
        )
        state.buildFiltros.etiquetas = filteredEtiquetas
      } else {
        state.buildFiltros.etiquetas = [...(etiquetas || []), name]
      }
    },
  },
})

export const { setDate, setEtiquetas } = BusquedaRutas.actions

export default BusquedaRutas.reducer
