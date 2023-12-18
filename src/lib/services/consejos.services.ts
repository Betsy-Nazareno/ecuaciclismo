import axios from 'axios'
import { DocumentResult } from 'expo-document-picker'
import { Consejo } from '../../models/Consejo.model'
import { isDocumentResultType } from '../../utils/ckeckTypes'
import { FOLDERS_STORAGE } from '../../utils/constants'
import { guardarArchivo } from '../googleCloudStorage'
import { BASE_URL } from '@env'

export const agregarConsejo = async (consejo: Consejo, token: string) => {
  try {
    const { imagen = {}, informacion = '' } = consejo || {}
    const document = imagen as DocumentResult
    if (document.type === 'cancel') {
      return
    }

    let path = ''
    if (imagen && isDocumentResultType(imagen)) {
      path = await guardarArchivo(
        FOLDERS_STORAGE.CONSEJOS,
        document.name,
        document.uri
      )
    }
    await axios({
      method: 'POST',
      url: `${BASE_URL}/api/consejodia/new_consejo_dia/`,
      data: { imagen: path, informacion },
      headers: { Authorization: 'Token ' + token },
    })
  } catch (e) {
    console.error(e)
  }
}

export const editarConsejo = async (
  consejo: Consejo,
  token: string,
  oldConsejo: Consejo
) => {
  try {
    const { imagen = {}, informacion = '' } = consejo || {}
    let path = oldConsejo.imagen || ''
    const document = imagen as DocumentResult
    if (document.type === 'cancel') {
      return
    }

    if (imagen && isDocumentResultType(imagen)) {
      path = await guardarArchivo(
        FOLDERS_STORAGE.CONSEJOS,
        document.name,
        document.uri
      )
    }
    await axios({
      method: 'POST',
      url: `${BASE_URL}/api/consejodia/update_consejo_dia/`,
      data: { informacion: informacion, imagen: path, token: oldConsejo.token },
      headers: { Authorization: 'Token ' + token },
    })
  } catch (e) {
    console.error(e)
  }
}

export const obtenerConsejosActuales = async (token: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${BASE_URL}/api/consejodia/get_consejos_dia/`,
      headers: { Authorization: 'Token ' + token },
    })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const obtenerConsejosHistoricos = async (token: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${BASE_URL}/api/consejodia/get_historico_consejos_dia/`,
      headers: { Authorization: 'Token ' + token },
    })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const republicarConsejo = async (
  authtoken: string,
  consejoId: string
) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${BASE_URL}/api/consejodia/republicar_consejo_dia/`,
      headers: { Authorization: 'Token ' + authtoken },
      data: { token: consejoId },
    })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const eliminarConsejo = async (token: string, tokenConsejo: string) => {
  try {
    await axios({
      method: 'DELETE',
      url: `${BASE_URL}/api/consejodia/delete_consejo_dia/`,
      data: { token: tokenConsejo },
      headers: { Authorization: 'Token ' + token },
    })
  } catch (e) {
    console.error(e)
  }
}

export const despinnearConsejo = async (token: string, authtoken: string) => {
  try {
    await axios({
      method: 'POST',
      url: `${BASE_URL}/api/consejodia/remove_fijar_consejo/`,
      headers: { Authorization: 'Token ' + authtoken },
      data: { token_consejo: token },
    })
  } catch (e) {
    console.error(e)
  }
}

export const pinnearConsejo = async (token: string, authtoken: string) => {
  try {
    await axios({
      method: 'POST',
      url: `${BASE_URL}/api/consejodia/fijar_consejo/`,
      headers: { Authorization: 'Token ' + authtoken },
      data: { token_consejo: token },
    })
  } catch (e) {
    console.error(e)
  }
}
