import { User } from './User'
import { Audio } from 'expo-av'
import * as ImagePicker from 'expo-image-picker';
import { MultimediaResult } from './Publicaciones.model';


export interface RutaCoordinadas {
  coordinateX: Coordinate
  coordinateY: Coordinate
}

export interface Coordinate {
  latitude: number
  longitude: number
}


export interface Alerta {
  descripcion: string
  tipo: string
  fecha_creacion?: string
  fecha_fin?: string
  comentarios?: Comentario[]
  colaboraciones: string[]
  colaboracionesValues?: any[]
  multimediaResult?: MultimediaResult[]
  multimedia: ImagePicker.ImagePickerResult[]
  audios: Audio.Recording[]
  ubicacion: RutaCoordinadas
  value?:string
  visibilidad:string[]
  first_name?: string
  last_name?: string
  token?: string
  token_usuario?: string
  estado?: string
  tipoUser?: string
  participantes?: Partial<User>[]
  foto?: string //Foto del usuario
  motivo_cancelacion?: string
  token_notificacion?: string //Token notificación del usuario q hizo la alerta
}


export type multimediaTypes = 'image' | 'video' | 'audio'

export interface Comentario {
    comentario: string
    fecha_creacion: string
    username?:string
    first_name?: string
    last_name?: string
    foto?: string
    tipo: string
    token_comentario?: string
    token_usuario?: string
  }

