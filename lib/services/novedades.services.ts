import axios from 'axios'
import { DocumentResult } from 'expo-document-picker'
import { PublicidadInterface } from '../../models/Publicidad.model'
import { isDocumentResultType } from '../../utils/ckeckTypes'
import { FOLDERS_STORAGE } from '../../utils/constants'
import { guardarArchivo } from '../googleCloudStorage'

export const agregarNovedad = async (
  authToken: string,
  data: PublicidadInterface
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
        datos_contacto: {
          nombre: data.datos_contacto?.nombre,
          celular: data.datos_contacto?.celular,
          direccion: data.datos_contacto?.direccion,
        },
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
