import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RegistroLocalSeguroSlice {
    modifyRegistroLocalSeguro?: boolean,
}

const initialState: RegistroLocalSeguroSlice = {
    modifyRegistroLocalSeguro: false,
}

export const RegistroLocalSeguro = createSlice({
  name: 'RegistroLocalSeguro',
  initialState,
  reducers: {
    setModifyRegistroLocalSeguro: (state, action: PayloadAction<RegistroLocalSeguroSlice>) => {
      state.modifyRegistroLocalSeguro = action.payload.modifyRegistroLocalSeguro
    },
  },
})

export const {
    setModifyRegistroLocalSeguro,
} = RegistroLocalSeguro.actions

export default RegistroLocalSeguro.reducer
