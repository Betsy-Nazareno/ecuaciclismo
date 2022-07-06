import { DocumentResult } from 'expo-document-picker'
import { ImageSourcePropType } from 'react-native'

export interface Consejo {
  imagen?: TypeImage
  email?: string
  first_name?: string
  foto?: string
  last_name?: string
  informacion: string
  username?: string
  token?: string
}

export type TypeImage =
  | string
  | ImageSourcePropType
  | DocumentResult
  | { uri: string }
