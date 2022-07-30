import { Consejo } from './Consejo.model'
import { NovedadInterface } from './Novedad.model'
import { Publicacion } from './Publicaciones.model'

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
  DetallePublicacion: { token: string } | undefined
  PublicacionFormulario: { data: Publicacion } | undefined
  RutasFormulario: undefined
  DetalleRuta: undefined
  InicioRastreo: undefined
  RastreoUbicacion: undefined
  RutaIncompleta: undefined
  FinalRuta: undefined
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
  | 'RutasFormulario'
  | 'DetalleRuta'
  | 'InicioRastreo'
  | 'RastreoUbicacion'
  | 'RutaIncompleta'
  | 'FinalRuta'

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
