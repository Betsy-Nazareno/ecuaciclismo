import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import consejoReducer from './consejo'
import screensReducer from './screens'
import drawerTabsReducer from './drawerTabs'
import NovedadReducer from './novedad'

export const store = configureStore({
  reducer: {
    user: userReducer,
    consejo: consejoReducer,
    screens: screensReducer,
    drawerTabs: drawerTabsReducer,
    novedad: NovedadReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
