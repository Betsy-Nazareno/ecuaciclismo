import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PublicacionSlice {
  publicacionHasModified: boolean
}

const initialState: PublicacionSlice = {
  publicacionHasModified: false,
}

export const Publicacion = createSlice({
  name: 'publicacion',
  initialState,
  reducers: {
    setPublicacionHasModified: (
      state,
      action: PayloadAction<PublicacionSlice>
    ) => {
      state.publicacionHasModified = action.payload.publicacionHasModified
    },
  },
})

export const { setPublicacionHasModified } = Publicacion.actions

export default Publicacion.reducer
