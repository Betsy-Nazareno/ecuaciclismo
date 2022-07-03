export interface User {
  first_name: string
  last_name: string
  email: string
  username: string
  token?: string
  celular?: string
  fecha_nacimiento?: Date
  genero?: string
  admin?: boolean
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
