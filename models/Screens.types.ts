import { Consejo } from './Consejo.model'
import { PublicidadInterface } from './Publicidad.model'

export type RootStackParamList = {
  Inicio: { reload: boolean } | undefined
  Login: undefined
  Registro: undefined
  Rutas: undefined
  Publicaciones: undefined
  Perfil: undefined
  AgregarConsejo: { consejo: Consejo } | undefined
  AgregarPublicidad: { publicidad: PublicidadInterface } | undefined
  DetallePublicidad: { data: PublicidadInterface } | undefined
}

export type Screens =
  | 'Inicio'
  | 'Perfil'
  | 'Login'
  | 'Registro'
  | 'Rutas'
  | 'AgregarConsejo'
  | 'Publicaciones'
  | 'AgregarPublicidad'
  | 'DetallePublicidad'

export type RootDrawerParamList = {
  HomeStack: undefined
  Consejos: undefined
  Comunidad: undefined
  Novedades: undefined
  ConsejoDetalle: { consejo: Consejo } | undefined
  DetallePublicidad: { data: PublicidadInterface } | undefined
  Publicaciones: undefined
}

export type ScreensDrawer =
  | 'HomeStack'
  | 'Consejos'
  | 'Comunidad'
  | 'Novedades'
  | 'DetallePublicidad'
  | 'Publicaciones'
