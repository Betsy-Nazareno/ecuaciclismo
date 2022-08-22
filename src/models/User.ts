import { catalogs } from './Rutas'

export interface User {
  first_name: string
  last_name: string
  foto: string
  email: string
  username: string
  celular?: string
  edad?: number
  nivel?: string
  peso?: number
  genero?: string
  admin?: boolean
  tipo?: string
  marca?: string
  codigo?: string
  foto_bicicleta?: string
  etiquetas?: catalogs[]
  rutas?: any
}

export interface Login {
  email: string
  password: string
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
