import { Audio } from 'expo-av'
import { DocumentResult } from 'expo-document-picker'
import { Publicacion } from '../../models/Publicaciones.model'
import { FOLDERS_STORAGE } from '../../utils/constants'
import { guardarArchivo } from '../googleCloudStorage'

export const agregarPublicacion = async (
  publicacion: Publicacion,
  token: string
) => {
  try {
    const { audios, multimedia } = publicacion
    const audiosPaths = await guardrAudios(audios)
    const multimediaPaths = await guardarMultimedia(multimedia)
    if (token && audiosPaths && multimediaPaths) {
      return
    }
    //enviar a enrique así {...audiosPaths, ...multimediaPaths}
  } catch (e) {
    console.error(e)
  }
}

const guardrAudios = async (audios: Audio.Recording[]) => {
  const audiosPaths = []
  for (let i = 0; i < audios.length; i++) {
    const uri = audios[i].getURI() || ''
    const path = await guardarArchivo(
      FOLDERS_STORAGE.PUBLICACIONES,
      uri.replace(/\//g, ''),
      uri
    )
    audiosPaths.push({ link: path, type: 'audio' })
  }
  return audiosPaths
}

const guardarMultimedia = async (multimedia: DocumentResult[]) => {
  const multimediaPaths = []
  for (let i = 0; i < multimedia.length; i++) {
    const file = multimedia[i]
    if (file.type !== 'cancel') {
      const { uri, name, mimeType } = file
      const fileType = mimeType?.split('/')[0]
      const path = await guardarArchivo(
        FOLDERS_STORAGE.PUBLICACIONES,
        name,
        uri
      )
      multimediaPaths.push({ link: path, type: fileType })
    }
  }
  return multimediaPaths
}
