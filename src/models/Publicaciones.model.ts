import { Audio } from 'expo-av'
import { DocumentResult } from 'expo-document-picker'
import { ImageSourcePropType } from 'react-native'
import { Etiqueta } from './Etiqueta.model'

export interface Filtro extends Etiqueta {
  icon: ImageSourcePropType
}

export interface Publicacion {
  titulo: string
  etiquetas: string[]
  descripcion: string
  multimedia: DocumentResult[]
  audios: Audio.Recording[]
}

export type EtiquetaPublicacion =
  | 'recomendaciones'
  | 'felicitaciones'
  | 'peligro'
  | 'salud'
  | 'noticia'
