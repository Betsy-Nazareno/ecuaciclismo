import { Audio } from 'expo-av'
import { DocumentResult } from 'expo-document-picker'
import { ImageSourcePropType } from 'react-native'
import { MultimediaResult } from '../models/Publicaciones.model'

export const isDocumentResultType = (
  file: string | ImageSourcePropType | DocumentResult | MultimediaResult
): file is DocumentResult => {
  const fi = file as DocumentResult
  return typeof fi.type === 'string'
}

export const isAudioRecording = (
  file: MultimediaResult | Audio.Recording
): file is Audio.Recording => {
  const fi = file as Audio.Recording
  return !!fi._uri
}
