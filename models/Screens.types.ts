import { Consejo } from './Consejo.model'

export type RootStackParamList = {
  Inicio: { reload: boolean } | undefined
  Login: undefined
  Registro: undefined
  Publicaciones: undefined
  Rutas: undefined
  Perfil: undefined
  AgregarConsejo: { consejo: Consejo } | undefined
}

export type Screens =
  | 'Inicio'
  | 'Perfil'
  | 'Login'
  | 'Registro'
  | 'Publicaciones'
  | 'Rutas'
  | 'AgregarConsejo'
