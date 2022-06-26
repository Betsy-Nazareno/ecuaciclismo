import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import consejoReducer from './consejo'
import screensReducer from './screens'

export const store = configureStore({
  reducer: {
    user: userReducer,
    consejo: consejoReducer,
    screens: screensReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
