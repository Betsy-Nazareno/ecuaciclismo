import { DocumentResult } from 'expo-document-picker'
import { ImageSourcePropType } from 'react-native'
import { ReaccionesInterface } from './Reacciones.model'

export interface Consejo {
  imagen?: TypeImage
  email?: string
  first_name?: string
  foto?: string
  last_name?: string
  informacion: string
  username?: string
  token?: string
  reacciones?: ReaccionesInterface
}

export type TypeImage =
  | string
  | ImageSourcePropType
  | DocumentResult
  | { uri: string }
