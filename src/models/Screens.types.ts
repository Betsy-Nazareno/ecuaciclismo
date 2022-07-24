import { Consejo } from './Consejo.model'
import { NovedadInterface } from './Novedad.model'

export type RootStackParamList = {
  Inicio: { reload: boolean } | undefined
  Login: undefined
  Registro: undefined
  Rutas: undefined
  Publicaciones: undefined
  Perfil: undefined
  ConsejoFormulario: { consejo: Consejo } | undefined
  NovedadFormulario: { publicidad: NovedadInterface } | undefined
  DetalleNovedad: { data: NovedadInterface } | undefined
  DetallePublicacion: undefined
  PublicacionFormulario: undefined
}

export type Screens =
  | 'Inicio'
  | 'Perfil'
  | 'Login'
  | 'Registro'
  | 'Rutas'
  | 'ConsejoFormulario'
  | 'Publicaciones'
  | 'NovedadFormulario'
  | 'DetalleNovedad'
  | 'DetallePublicacion'
  | 'PublicacionFormulario'

export type RootDrawerParamList = {
  HomeStack: undefined
  HistorialConsejos: undefined
  Comunidad: undefined
  Novedades: undefined
  ConsejoDetalle: { consejo: Consejo } | undefined
  DetalleNovedad: { data: NovedadInterface } | undefined
  Publicaciones: undefined
}

export type ScreensDrawer =
  | 'HomeStack'
  | 'HistorialConsejos'
  | 'Comunidad'
  | 'Novedades'
  | 'DetalleNovedad'
  | 'Publicaciones'
