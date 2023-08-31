import axios from 'axios'
import { Audio } from 'expo-av'
import { Alerta } from '../../models/Alertas'
import { MultimediaResult } from '../../models/Publicaciones.model'
import { isAudioRecording, isImagePickerResult } from '../../utils/ckeckTypes'
import { FOLDERS_STORAGE } from '../../utils/constants'
import { guardarArchivo } from '../googleCloudStorage'
import { ImagePickerResult } from 'expo-image-picker'

const converterAlerta= (alerta: Alerta)=>{
  const colaboraciones= alerta.colaboraciones as unknown as any[]
  const parseColaboraciones=colaboraciones.map((colaboracion:any)=>{
        return colaboracion.token
  })
  return {
    ...alerta,
    colaboraciones:parseColaboraciones,
    colaboracionesValues:colaboraciones,
    multimediaResult:alerta.multimedia as unknown as MultimediaResult[],
  }
} 
export const agregarAlerta = async (
  alerta: Alerta,
  token: string
) => {
  try {
    const { audios, multimedia } = alerta
    const audiosPaths = await guardarAudios(audios)
    const multimediaPaths = await guardarMultimedia(multimedia)
    const data = {
      etiqueta: alerta.tipo,
      ubicacion: alerta.ubicacion,
      descripcion: alerta.descripcion,
      visibilidad:alerta.visibilidad,
      multimedia: [...audiosPaths, ...multimediaPaths],
      colaboraciones:alerta.colaboraciones,
    }
    const response=await axios({
      method: 'POST',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/alerta/new_alerta/',
      data,
      headers: { Authorization: 'Token ' + token },
    })
    return response.data?.data
  } catch (e) {
    console.error(e)
  }
}
export const obtenerAlertasEnviadas= async (token:string) =>{
    try {
        const response = await axios({
          method: 'GET',
          url: 'https://ecuaciclismoapp.pythonanywhere.com/api/alerta/get_alertas_enviadas/',
          headers: { Authorization: 'Token ' + token },
        })
        return response.data?.data
      } catch (e) {
        console.error(e)
      }
}

export const obtenerAlertasRecibidas= async (token:string) =>{
    try {
        const response = await axios({
          method: 'GET',
          url: 'https://ecuaciclismoapp.pythonanywhere.com/api/alerta/get_alertas_recibidas/',
          headers: { Authorization: 'Token ' + token },
        })
        return response.data?.data
      } catch (e) {
        console.error(e)
      }
}

export const getAlertaById = async (authToken: string, token: string) => {
  if (!token) return
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/alerta/get_alerta/',
      data: { token_alerta: token },
      headers: {
        Authorization: 'Token ' + authToken,
        'Content-Type': 'application/json',

      },
    })
    const { alerta } = response.data || {};
    if (alerta) {
      return converterAlerta(alerta);
    } else {
      console.error('No se encontró la alerta');
      // Manejar el caso en que no se encontró la alerta
    }
  } catch (e) {
    console.error(e);
  }
}

export const agregarComentarioAlerta = async (
  authToken: string,
  token_alerta: string,
  comentario: string
) => {
  try {
    await axios({
      method: 'POST',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/alerta/new_comentario_alerta/',
      data: { token_alerta, comentario },
      headers: {
        Authorization: 'Token ' + authToken,
      },
    })
  } catch (e) {
    console.error(e)
  }
}
export const actualizarAlerta = async (
  authToken: string,
  token_alerta: string,
  estado: string,
  motivo_cancelacion: string
) => {
  try {
    await axios({
      method: 'POST',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/alerta/update_alerta/',
      data: { token_alerta,estado, motivo_cancelacion }, 
      headers: { Authorization: 'Token ' + authToken },
    })
  } catch (e) {
    console.error(e)
  }
}

export const confirmarAsistencia= async (
  authToken: string,
  token_alerta: string
) => {
  try {
    await axios({
      method: 'POST',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/alerta/confirmar_asistencia/',
      data: { token_alerta },
      headers: { Authorization: 'Token ' + authToken },
    })
  } catch (e) {
    console.error(e)
  }
}

const guardarAudios = async (audios: Audio.Recording[]) => {
  const audiosPaths = []
  for (let i = 0; i < audios?.length; i++) {
    const audio = audios[i]
    const isAudioRecord = isAudioRecording(audio)
    if (isAudioRecord) {
      const uri = audio.getURI() || ''
      const path = await guardarArchivo(
        FOLDERS_STORAGE.ALERTAS,
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

const guardarMultimedia = async (multimedia: ImagePickerResult[]) => {
  const multimediaPaths = []
  for (let i = 0; i < multimedia?.length; i++) {
    const file = multimedia[i]
    const isDocResult = isImagePickerResult(file)
    console.log('isDocResult', isDocResult)
    console.log('file', file)
    console.log('file.cancelled', file.cancelled)
    if (isDocResult && file.cancelled==false) {
      const { uri, type } = file
      const name= uri.split('/').pop() || ''
      const fileType = type
      console.log('type', type)
      const path = await guardarArchivo(
        FOLDERS_STORAGE.ALERTAS,
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