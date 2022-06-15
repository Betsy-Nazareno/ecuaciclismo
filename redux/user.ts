import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const Auth = createSlice({
  name: 'user',
  initialState: { name: '', email: '' },
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.name = action.payload.name
      state.email = action.payload.email
    },
  },
})

export const { login } = Auth.actions

export default Auth.reducer
