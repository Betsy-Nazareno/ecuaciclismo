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
import SecureContacts from './SecureContacts'
import AlertaReducer from './alerta'
import AlertaBusqueda from './alertaBusqueda'
import RegistroLocalSeguro from './RegistroLocalSeguro'
import LugarReducer from './lugar'
import SolicitudReducer from './solicitud'
import RegistroVerificado from './RegistroVerificado'
import BicicletaReducer from './bicicleta'
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
    contactosSeguros: SecureContacts,
    alerta:AlertaReducer,
    bicicleta:BicicletaReducer,
    busquedaAlertas:AlertaBusqueda,
    registroLocalSeguro: RegistroLocalSeguro,
    lugar: LugarReducer,
    solicitud: SolicitudReducer,
    verificado: RegistroVerificado,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
