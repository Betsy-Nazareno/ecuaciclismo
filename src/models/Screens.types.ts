import { Consejo } from './Consejo.model'
import { NovedadInterface } from './Novedad.model'
import { Publicacion } from './Publicaciones.model'
import { Ruta } from './Rutas'

export type RootStackParamList = {
  Inicio: { reload: boolean } | undefined
  Login: undefined
  Registro: undefined
  Rutas: undefined
  Publicaciones: undefined
  ContactosComunidad: undefined
  Perfil: { userToken: string } | undefined
  ConsejoFormulario: { consejo: Consejo } | undefined
  NovedadFormulario: { publicidad: NovedadInterface } | undefined
  DetalleNovedad: { data: NovedadInterface } | undefined
  DetallePublicacion: { token: string } | undefined
  PublicacionFormulario: { data: Publicacion } | undefined
  RutasFormulario: { ruta: Ruta } | undefined
  DetalleRuta: { token: string } | undefined
  InicioRastreo: { ruta: Ruta } | undefined
  RastreoUbicacion: { ruta: Ruta } | undefined
  RutaIncompleta: { tokenRuta: string; tokenUsuario: string } | undefined
  FinalRuta: { tokenRuta: string; tokenUsuario: string } | undefined
  PerfilFormulario: { data: any } | undefined
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
  | 'PerfilFormulario'
  | 'ContactosComunidad'

export type RootDrawerParamList = {
  HomeStack: undefined
  HistorialConsejos: undefined
  Comunidad: undefined
  Novedades: undefined
  Perfil: { userToken: string } | undefined
  ConsejoDetalle: { consejo: Consejo } | undefined
  DetalleNovedad: { data: NovedadInterface } | undefined
  Publicaciones: undefined
  Inicio: undefined
  Contactenos: undefined
  ContactosSeguros: undefined
  Seguridad: undefined
}

export type ScreensDrawer =
  | 'HomeStack'
  | 'HistorialConsejos'
  | 'Comunidad'
  | 'Novedades'
  | 'DetalleNovedad'
  | 'Publicaciones'
  | 'Inicio'
  | 'Perfil'
  | 'Contactenos'
  | 'ContactosSeguros'
  | 'Seguridad'
  
