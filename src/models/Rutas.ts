import { User } from './User'

export interface RutaCoordinadas {
  coordinateX: Coordinate
  coordinateY: Coordinate
}

export interface Coordinate {
  latitude: number
  longitude: number
}

export type EstadoRuta =
  | 'En Curso'
  | 'Disponible'
  | 'Cancelada'
  | 'Finalizada'
  | 'Sin Cupos'

export interface Ruta {
  nombre: string
  descripcion: string
  cupos_disponibles: number | undefined
  lugar: string
  fecha_inicio?: Date
  fecha_fin?: Date
  requisitos: string[]
  requisitosValues?: any[]
  colaboraciones: string[]
  colaboracionesValues?: any[]
  tipoRuta: any[]
  tipoRutaValues?: any[]
  ubicacion: RutaCoordinadas
  fotos: any
  token?: string
  fotosResult?: ImagesUriPath[]
  estado?: Estado
  inscrito?: boolean
  participantes?: Partial<User>[]
  aprobado?: boolean
  motivo_cancelacion?: string
}

export interface Estado {
  estado_no_iniciada?: boolean
  estado_finalizado?: boolean
  estado_en_curso?: boolean
  estado_sin_cupos?: boolean
  estado_cancelado?: boolean
  prioridad: number
}

export interface ImagesUriPath {
  link: string
  path: string
}

export interface catalogs {
  nombre: string
  token?: string
  value?: string
}
