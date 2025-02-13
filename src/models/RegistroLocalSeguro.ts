import { DocumentResult } from 'expo-document-picker'

export interface LocalCoordinates {
  coordinateX: Coordinate
  coordinateY: Coordinate
}

export interface Coordinate {
  latitude: number
  longitude: number
}

export interface RegistroLocalSeguro {
    nombre: string,
    servicio: string,
    descripcion: string,
    parqueadero: any,
    ciudad: string,
    direccion: string,
    ubicacion: LocalCoordinates,
    celular: string,
    hora_inicio: string,
    hora_fin: string,
    payment?: DocumentResult[],
    cedula: DocumentResult[],
    imagen: DocumentResult[],
    registerType: string,
}
