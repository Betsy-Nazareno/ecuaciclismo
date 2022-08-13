import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import consejoReducer from './consejo'
import screensReducer from './screens'
import drawerTabsReducer from './drawerTabs'
import NovedadReducer from './novedad'
import publicacionBusqueda from './publicacionBusqueda'
import publicacionReducer from './publicacion'
import BusquedaRutas from './rutasBusqueda'
import Rutas from './ruta'

export const store = configureStore({
  reducer: {
    user: userReducer,
    consejo: consejoReducer,
    screens: screensReducer,
    drawerTabs: drawerTabsReducer,
    novedad: NovedadReducer,
    busqueda: publicacionBusqueda,
    publicacion: publicacionReducer,
    busquedaRutas: BusquedaRutas,
    ruta: Rutas,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
