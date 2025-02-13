import { catalogs } from './Rutas'

export interface User {
  first_name: string
  last_name: string
  foto: string
  email: string
  telefono?: string
  username: string
  celular?: string
  edad?: number
  nivel?: string
  peso?: number
  genero?: string
  admin?: boolean
  tipo: string
  propietary?:boolean
  etiquetas?: catalogs[]
  rutas?: any
  id_usuario?: string
}

export interface Login {
  email: string
  password: string
  token_notificacion: string
}

export interface Registro {
  email: string
  username: string
  first_name: string
  last_name: string
  password: string
  password_confirmation: string
}
export interface UserSession {
  token: string
  user: User
}
