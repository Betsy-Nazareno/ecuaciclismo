export interface Ruta {
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
