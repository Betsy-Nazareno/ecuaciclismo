import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ConsejoSlice {
  hasModified: boolean
}

const initialState: ConsejoSlice = {
  hasModified: false,
}

export const Consejo = createSlice({
  name: 'consejo',
  initialState,
  reducers: {
    setHasModified: (state, action: PayloadAction<ConsejoSlice>) => {
      state.hasModified = action.payload.hasModified
    },
  },
})

export const { setHasModified } = Consejo.actions

export default Consejo.reducer
