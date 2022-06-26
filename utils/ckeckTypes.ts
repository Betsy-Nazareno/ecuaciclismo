import { DocumentResult } from 'expo-document-picker'
import { ImageSourcePropType } from 'react-native'

export const isDocumentResultType = (
  file: string | ImageSourcePropType | DocumentResult
) => {
  const fi = file as DocumentResult
  return typeof fi.type === 'string'
}
