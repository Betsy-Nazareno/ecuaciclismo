import { Audio } from 'expo-av'
import { DocumentResult } from 'expo-document-picker'
import { ImageSourcePropType } from 'react-native'
import { MultimediaResult } from '../models/Publicaciones.model'
import { ImagePickerResult } from 'expo-image-picker';

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

export const isImagePickerResult = (
  file: ImagePickerResult
): file is ImagePickerResult => {
  const fi = file as ImagePickerResult;

  return 'uri' in fi && 'type' in fi && 'width' in fi  ;
}