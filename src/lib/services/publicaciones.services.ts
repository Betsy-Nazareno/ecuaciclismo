import axios from 'axios'
import { Audio } from 'expo-av'
import { DocumentResult } from 'expo-document-picker'
import { Etiqueta } from '../../models/Etiqueta.model'
import { MultimediaResult, Publicacion } from '../../models/Publicaciones.model'
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
    const data = {
      titulo: publicacion.titulo,
      descripcion: publicacion.descripcion,
      etiquetas: publicacion.etiquetas,
      multimedia: [...audiosPaths, ...multimediaPaths],
    }
    await axios({
      method: 'POST',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/publicacion/new_publicacion/',
      data,
      headers: { Authorization: 'Token ' + token },
    })
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
    audiosPaths.push({ link: path, tipo: 'audio' })
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
      multimediaPaths.push({ link: path, tipo: fileType })
    }
  }
  return multimediaPaths
}

export const obtenerPublicaciones = async (token: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/publicacion/get_publicaciones/',
      headers: { Authorization: 'Token ' + token },
    })
    const { data } = response.data || {}
    return converterPublicacionObject(data)
  } catch (e) {
    console.error(e)
  }
}

const converterPublicacionObject = (publicaciones: Publicacion[]) => {
  return publicaciones.map((publicacion) => {
    return {
      ...publicacion,
      multimediaResult: publicacion.multimedia as unknown as MultimediaResult[],
      etiquetasResult: publicacion.etiquetas as unknown as Etiqueta[],
    }
  })
}

export const eliminarPublicacion = async (
  authToken: string,
  publicacionToken: string
) => {
  if (authToken && publicacionToken) {
    return
  }
}
