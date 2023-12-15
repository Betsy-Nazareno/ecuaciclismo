import axios from 'axios'
import { Audio } from 'expo-av'
import { DocumentResult } from 'expo-document-picker'
import { Etiqueta } from '../../models/Etiqueta.model'
import { MultimediaResult, Publicacion } from '../../models/Publicaciones.model'
import { isAudioRecording, isDocumentResultType } from '../../utils/ckeckTypes'
import { FOLDERS_STORAGE } from '../../utils/constants'
import { guardarArchivo } from '../googleCloudStorage'
import 'dotenv/config';
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
      url: '${process.env.BASE_URL}/api/publicacion/new_publicacion/',
      data,
      headers: { Authorization: 'Token ' + token },
    })
  } catch (e) {
    console.error(e)
  }
}

export const editarPublicacion = async (
  publicacion: Publicacion,
  authToken: string,
  tokenPublicacion: string
) => {
  try {
    const { audios, multimedia } = publicacion
    const audiosPaths = await guardrAudios(audios)
    const multimediaPaths = await guardarMultimedia(multimedia)
    const data = {
      token: tokenPublicacion,
      titulo: publicacion.titulo,
      descripcion: publicacion.descripcion,
      etiquetas: publicacion.etiquetas,
      multimedia: [...audiosPaths, ...multimediaPaths],
    }

    await axios({
      method: 'POST',
      url: `${process.env.BASE_URL}/api/publicacion/update_publicacion/`,
      data,
      headers: { Authorization: 'Token ' + authToken },
    })
  } catch (e) {
    console.error(e)
  }
}

const guardrAudios = async (audios: Audio.Recording[]) => {
  const audiosPaths = []
  for (let i = 0; i < audios?.length; i++) {
    const audio = audios[i]
    const isAudioRecord = isAudioRecording(audio)
    if (isAudioRecord) {
      const uri = audio.getURI() || ''
      const path = await guardarArchivo(
        FOLDERS_STORAGE.PUBLICACIONES,
        uri.replace(/\//g, ''),
        uri
      )
      audiosPaths.push({ link: path, tipo: 'audio', path: '' })
    } else {
      const audioResult = audio as unknown as MultimediaResult
      audiosPaths.push({ link: audioResult.link, tipo: 'audio', path: '' })
    }
  }
  return audiosPaths
}

const guardarMultimedia = async (multimedia: DocumentResult[]) => {
  const multimediaPaths = []
  for (let i = 0; i < multimedia?.length; i++) {
    const file = multimedia[i]
    const isDocResult = isDocumentResultType(file)
    if (isDocResult && file.type !== 'cancel') {
      const { uri, name, mimeType } = file
      const fileType = mimeType?.split('/')[0]
      const path = await guardarArchivo(
        FOLDERS_STORAGE.PUBLICACIONES,
        name,
        uri
      )
      multimediaPaths.push({ link: path, tipo: fileType, path: '' })
    } else {
      const fileResult = file as unknown as MultimediaResult
      if (fileResult.tipo !== 'audio') {
        multimediaPaths.push({
          link: fileResult.link,
          tipo: fileResult.tipo,
          path: '',
        })
      }
    }
  }
  return multimediaPaths
}

export const obtenerPublicaciones = async (token: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${process.env.BASE_URL}/api/publicacion/get_publicaciones/`,
      headers: { Authorization: 'Token ' + token },
    })
    const { data } = response.data || {}
    return converterPublicaciones(data)
  } catch (e) {
    console.error(e)
  }
}

const converterPublicaciones = (publicaciones: Publicacion[]) => {
  return publicaciones.map((publicacion) =>
    converterPublicacionObject(publicacion)
  )
}

const converterPublicacionObject = (publicacion: Publicacion) => {
  const etiquetas = publicacion.etiquetas as unknown as Etiqueta[]
  return {
    ...publicacion,
    multimediaResult: publicacion.multimedia as unknown as MultimediaResult[],
    etiquetas: etiquetas.map((etiqueta) => etiqueta.value),
    etiquetasResult: etiquetas,
  }
}

export const eliminarPublicacion = async (
  authToken: string,
  publicacionToken: string
) => {
  try {
    await axios({
      method: 'DELETE',
      url: `${process.env.BASE_URL}/api/publicacion/delete_publicacion/`,
      data: { token: publicacionToken },
      headers: {
        Authorization: 'Token ' + authToken,
        'Content-Type': 'application/json',
      },
    })
  } catch (e) {
    console.error(e)
  }
}

export const getPublicacionById = async (authToken: string, token: string) => {
  if (!token) return
  try {
    const response = await axios({
      method: 'POST',
      url: `${process.env.BASE_URL}/api/publicacion/get_publicacion/`,
      data: { token_publicacion: token },
      headers: {
        Authorization: 'Token ' + authToken,
        'Content-Type': 'application/json',
      },
    })
    const { data } = response.data || {}
    return converterPublicacionObject(data[0])
  } catch (e) {
    console.error(e)
  }
}

export const agregarComentarioPublicacion = async (
  authToken: string,
  token: string,
  comentario: string
) => {
  try {
    await axios({
      method: 'POST',
      url: `${process.env.BASE_URL}/api/publicacion/new_comentario_publicacion/`,
      data: { token, comentario },
      headers: {
        Authorization: 'Token ' + authToken,
      },
    })
  } catch (e) {
    console.error(e)
  }
}
