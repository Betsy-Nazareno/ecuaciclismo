import { ImageSourcePropType } from 'react-native'
import { TypeImage } from './Consejo.model'
import { Etiqueta } from './Etiqueta.model'

export interface Filtro extends Etiqueta {
  icon: ImageSourcePropType
}

export interface Publicacion {
  titulo: string
  etiquetas: string[]
  descripcion: string
  fotos: TypeImage[]
  audios: string[]
  adjuntos: string[]
}
