import axios from 'axios'
import { DocumentResult } from 'expo-document-picker'
import { Consejo } from '../../models/Consejo.model'
import { isDocumentResultType } from '../../utils/ckeckTypes'
import { FOLDERS_STORAGE } from '../../utils/constants'
import { guardarArchivo } from '../googleCloudStorage'

export const agregarConsejo = async (consejo: Consejo, token: string) => {
  try {
    const { imagen = {}, informacion = '' } = consejo || {}
    let path = ''
    if (imagen && isDocumentResultType(imagen)) {
      path = await guardarArchivo(
        FOLDERS_STORAGE.CONSEJOS,
        imagen as DocumentResult
      )
    }
    await axios({
      method: 'POST',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/consejodia/new_consejo_dia/',
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
    if (imagen && isDocumentResultType(imagen)) {
      path = await guardarArchivo(
        FOLDERS_STORAGE.CONSEJOS,
        imagen as DocumentResult
      )
    }
    await axios({
      method: 'POST',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/consejodia/update_consejo_dia/',
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
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/consejodia/get_consejos_dia/',
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
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/consejodia/get_historico_consejos_dia/',
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
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/consejodia/republicar_consejo_dia/',
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
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/consejodia/delete_consejo_dia/',
      data: { token: tokenConsejo },
      headers: { Authorization: 'Token ' + token },
    })
  } catch (e) {
    console.error(e)
  }
}
