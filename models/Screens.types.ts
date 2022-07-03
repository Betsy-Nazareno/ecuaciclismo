import { Consejo } from './Consejo.model'
import { Publicidad } from './Publicidad.model'

export type RootStackParamList = {
  Inicio: { reload: boolean } | undefined
  Login: undefined
  Registro: undefined
  Publicaciones: undefined
  Rutas: undefined
  Perfil: undefined
  AgregarConsejo: { consejo: Consejo } | undefined
  AgregarPublicidad: { publicidad: Publicidad } | undefined
  DetallePublicidad: { data: Publicidad } | undefined
}

export type Screens =
  | 'Inicio'
  | 'Perfil'
  | 'Login'
  | 'Registro'
  | 'Publicaciones'
  | 'Rutas'
  | 'AgregarConsejo'
  | 'AgregarPublicidad'
  | 'DetallePublicidad'

export type ScreensDrawer = 'HomeStack' | 'Consejos' | 'Comunidad' | 'Novedades'
