import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NovedadSlice {
  novedadHasModified: boolean
}

const initialState: NovedadSlice = {
  novedadHasModified: false,
}

export const Novedad = createSlice({
  name: 'novedad',
  initialState,
  reducers: {
    setNovedadHasModified: (state, action: PayloadAction<NovedadSlice>) => {
      state.novedadHasModified = action.payload.novedadHasModified
    },
  },
})

export const { setNovedadHasModified } = Novedad.actions

export default Novedad.reducer
