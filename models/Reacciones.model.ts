export interface ReaccionesInterface {
  encanta?: ReaccionValues
  like?: ReaccionValues
  apoyo?: ReaccionValues
  fuerza?: ReaccionValues
  ciclista?: ReaccionValues
}

export interface ReaccionValues {
  count?: number
  usuarios?: string[]
  reaccion_usuario?: boolean
}

export type ReaccionTypes = 'encanta' | 'like' | 'apoyo' | 'fuerza' | 'ciclista'
