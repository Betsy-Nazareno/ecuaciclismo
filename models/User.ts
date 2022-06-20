export interface User {
  first_name: string
  last_name: string
  email: string
  username: string
  token?: string
  celular?: string
  fecha_nacimiento?: Date
  genero?: string
}

export interface Login {
  email: string
  password: string
}

export interface UserSession {
  token: string
  user: User
}
