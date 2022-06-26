import { DocumentResult } from 'expo-document-picker'
import { ImageSourcePropType } from 'react-native'

export interface Consejo {
  imagen?: TypeImageConsejo
  email?: string
  first_name?: string
  foto?: string
  last_name?: string
  informacion: string
  username?: string
  token?: string
}

export type TypeImageConsejo =
  | string
  | ImageSourcePropType
  | DocumentResult
  | { uri: string }
