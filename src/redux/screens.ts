import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Screens } from '../models/Screens.types'

interface ScreenSlice {
  activeScreen: Screens
}

const initialState: ScreenSlice = {
  activeScreen: 'Inicio',
}

export const ScreenStore = createSlice({
  name: 'screens',
  initialState,
  reducers: {
    setActiveScreen: (state, action: PayloadAction<ScreenSlice>) => {
      state.activeScreen = action.payload.activeScreen
    },
  },
})

export const { setActiveScreen } = ScreenStore.actions

export default ScreenStore.reducer
