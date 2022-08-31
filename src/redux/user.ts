import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../models/User'

interface UserSlice {
  user: User | null
  refreshUser: boolean
}

const initialState: UserSlice = {
  user: null,
  refreshUser: false,
}

export const Auth = createSlice({
  name: 'user',
  initialState,
  reducers: {
    storeUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload.user
    },
    deleteUser: (state) => {
      state.user = null
    },
    updateLocalUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload.user
    },
    setUserHasRefresh: (state, action: PayloadAction<any>) => {
      state.refreshUser = action.payload.refreshUser
    },
  },
})

export const { storeUser, deleteUser, updateLocalUser, setUserHasRefresh } =
  Auth.actions

export default Auth.reducer
