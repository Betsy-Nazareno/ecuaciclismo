import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BuildFiltro } from '../models/Etiqueta.model'

interface Busqueda {
  text: string
  buildFiltros: BuildFiltro
}

const initialState: Busqueda = {
  text: '',
  buildFiltros: { fecha: undefined, etiquetas: [] },
}

export const BusquedaSolicitud = createSlice({
    name: 'busqueda',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<{ text: string }>) => {
            state.text = action.payload.text
        },
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

export const { setText, setDate, setEtiquetas} = BusquedaSolicitud.actions