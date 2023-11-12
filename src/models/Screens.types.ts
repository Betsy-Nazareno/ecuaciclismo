import {  RutaCoordinadas } from './Alertas'
import { Consejo } from './Consejo.model'
import { NovedadInterface } from './Novedad.model'
import { Publicacion } from './Publicaciones.model'
import { Ruta } from './Rutas'
import { RegistroLocalSeguro } from './RegistroLocalSeguro'
import { RegistroMiembro } from './RegistroMiembro'
import { Solicitud } from './Solicitud'

export type RootStackParamList = {
  Inicio: { reload: boolean } | undefined
  Login: undefined
  Registro: undefined
  RecuperarContrasena: undefined
  Rutas: undefined
  Publicaciones: undefined
  ContactosComunidad: undefined
  ContactosCelular: undefined
  RegistroLocalSeguro: undefined
  RegistroLocalSeguroRequisitos: { registerType: string } | undefined
  RegistroLocalSeguroFormulario: { registerType: string; initValues?: RegistroLocalSeguro } | undefined
  DescargarSubirPDF: undefined
  RegistroMiembro: undefined
  RequisitosMiembro: undefined
  FormularioMiembro: { initValues?: RegistroMiembro } | undefined
  PaginaDescargaMiembro: undefined
  RegistroVerificado: undefined
  SeleccionarUsers: undefined
  
  ConsejoFormulario: { consejo: Consejo } | undefined
  NovedadFormulario: { publicidad: NovedadInterface } | undefined
  DetalleNovedad: { data: NovedadInterface } | undefined
  DetallePublicacion: { token: string } | undefined

  PublicacionFormulario: { data: Publicacion } | undefined
  RutasFormulario: { ruta: Ruta } | undefined
  DetalleRuta: { token: string } | undefined
  DetalleAlerta:{token: string} | undefined
  DetalleSolicitud:{solicitud: Solicitud} | undefined
  InicioRastreo: { ruta: Ruta } | undefined
  RastreoUbicacion: { ruta: Ruta } | undefined
  RutaIncompleta: { tokenRuta: string; tokenUsuario: string } | undefined
  FinalRuta: { tokenRuta: string; tokenUsuario: string } | undefined
  
  Alertas: undefined
  AlertaFormulario: { data: RutaCoordinadas } | undefined
  
  Solicitudes: undefined
  
}

export type Screens =
  | 'Inicio'
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
  | 'DetalleAlerta'
  | 'InicioRastreo'
  | 'RastreoUbicacion'
  | 'RutaIncompleta'
  | 'FinalRuta'
  
  | 'ContactosComunidad'
  | 'ContactosCelular'
  | 'Alertas'
  | 'AlertaFormulario'
  | 'RegistroLocalSeguro'
  | 'RegistroLocalSeguroRequisitos'
  | 'RegistroLocalSeguroFormulario'
  | 'DescargarSubirPDF'
  | 'DetalleSolicitud'
  | 'Solicitudes'
  | 'RegistroMiembro'
  | 'RequisitosMiembro'
  | 'FormularioMiembro'
  | 'PaginaDescargaMiembro'
  | 'RegistroVerificado'
  | 'SeleccionarUsers'
  | 'RecuperarContrasena'
  

export type RootDrawerParamList = {
  HomeStack: undefined
  HistorialConsejos: undefined
  Comunidad: undefined
  Novedades: undefined
  Perfil: { userToken: string } | undefined
  PerfilFormulario: { data: any } | undefined
  ConsejoDetalle: { consejo: Consejo } | undefined
  DetalleNovedad: { data: NovedadInterface } | undefined
  Publicaciones: undefined
  Inicio: undefined
  Contactenos: undefined
  ContactosSeguros: undefined
  Seguridad: undefined
  Lugares: undefined
  Solicitudes: undefined
  Bicicletas: undefined
  LugarFormulario: { longitud: number | 0; latitud:number | 0 } | undefined
  BicicletaFormulario:{tokenUsuario:string}
  DetalleBicicleta : {token: string} | undefined
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
  | 'PerfilFormulario'
  | 'Contactenos'
  | 'ContactosSeguros'
  | 'LugarFormulario'
  | 'Seguridad'
  | 'Lugares'
  | 'Solicitudes'
  | 'Bicicletas'
  | 'BicicletaFormulario'
  | 'DetalleBicicleta'

  
