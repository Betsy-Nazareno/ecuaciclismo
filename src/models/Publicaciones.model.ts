import { Audio } from 'expo-av'
import { DocumentResult } from 'expo-document-picker'
import { ImageSourcePropType } from 'react-native'
import { Etiqueta } from './Etiqueta.model'

export interface Filtro extends Etiqueta {
  icon?: ImageSourcePropType | string
}

export interface Publicacion {
  titulo: string
  etiquetas: string[]
  etiquetasResult?: Etiqueta[]
  descripcion: string
  multimedia: DocumentResult[]
  multimediaResult?: MultimediaResult[]
  audios: Audio.Recording[]
  first_name?: string
  last_name?: string
  token?: string
  ultimo_cambio?: string
}

export interface MultimediaResult {
  link: string
  tipo: string
}

export type multimediaTypes = 'image' | 'video' | 'application' | 'audio'
