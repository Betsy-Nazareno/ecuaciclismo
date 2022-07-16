import axios from 'axios'
import { DocumentResult } from 'expo-document-picker'
import { NovedadInterface } from '../../models/Novedad.model'
import { isDocumentResultType } from '../../utils/ckeckTypes'
import { FOLDERS_STORAGE } from '../../utils/constants'
import { guardarArchivo } from '../googleCloudStorage'

export const agregarNovedad = async (
  authToken: string,
  data: NovedadInterface
) => {
  const { imagen } = data
  let path = imagen || ''
  if (imagen && isDocumentResultType(imagen)) {
    path = await guardarArchivo(
      FOLDERS_STORAGE.NOVEDADES,
      imagen as DocumentResult
    )
  }
  try {
    await axios({
      method: 'POST',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/consejodia/new_novedad/',
      headers: { Authorization: 'Token ' + authToken },
      data: {
        titulo: data.titulo,
        descripcion: data.descripcion,
        descripcion_corta: data.descripcion_corta,
        imagen: path,
        nombre: data.nombre,
        celular: data.celular,
        direccion: data.direccion,
      },
    })
  } catch (e) {
    console.error(e)
  }
}

export const obtenerNovedades = async (token: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/consejodia/get_novedades/',
      headers: { Authorization: 'Token ' + token },
    })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const eliminarNovedad = async (token: string, tokenNovedad: string) => {
  try {
    await axios({
      method: 'DELETE',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/consejodia/delete_novedad/',
      data: { token: tokenNovedad },
      headers: { Authorization: 'Token ' + token },
    })
  } catch (e) {
    console.error(e)
  }
}
