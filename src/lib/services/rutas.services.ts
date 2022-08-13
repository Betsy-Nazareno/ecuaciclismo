import axios from 'axios'
import { DocumentResult } from 'expo-document-picker'
import { catalogs, Ruta } from '../../models/Rutas'
import { isDocumentResultType } from '../../utils/ckeckTypes'
import { FOLDERS_STORAGE } from '../../utils/constants'
import { guardarArchivo } from '../googleCloudStorage'

export const getRequisitos = async (authToken: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/ruta/get_requisitos/',
      headers: { Authorization: 'Token ' + authToken },
    })
    const requisitos = response.data?.data || []
    const finalRequisitos = requisitos.map((requisito: catalogs) => ({
      nombre: requisito.nombre,
      value: requisito.token,
    }))
    return finalRequisitos
  } catch (e) {
    console.error(e)
  }
}

export const getTiposRuta = async (authToken: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/ruta/get_tipos_rutas/',
      headers: { Authorization: 'Token ' + authToken },
    })
    const tipos = response.data?.data || []
    const finaltipos = tipos.map((tipo: catalogs) => ({
      nombre: tipo.nombre,
      value: tipo.token,
    }))
    return finaltipos
  } catch (e) {
    console.error(e)
  }
}

export const getColaboracionesRutas = async (authToken: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/ruta/get_colaboraciones/',
      headers: { Authorization: 'Token ' + authToken },
    })
    const colaboraciones = response.data?.data || []
    const finalcolaboraciones = colaboraciones.map(
      (colaboracion: catalogs) => ({
        nombre: colaboracion.nombre,
        value: colaboracion.token,
      })
    )
    return finalcolaboraciones
  } catch (e) {
    console.error(e)
  }
}

export const getAllRutas = async (authToken: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/ruta/get_rutas/',
      headers: { Authorization: 'Token ' + authToken },
    })
    return response.data?.data
  } catch (e) {
    console.error(e)
  }
}

export const guardarRuta = async (authToken: string, ruta: Ruta) => {
  try {
    const fotos = await guardarGaleriaFotos(ruta.fotos || [])
    await axios({
      method: 'POST',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/ruta/new_ruta/',
      data: {
        ...ruta,
        fotos,
        fecha_inicio: ruta.fecha_inicio?.toISOString().split('.')[0],
        fecha_fin: ruta.fecha_fin?.toISOString().split('.')[0],
      },
      headers: { Authorization: 'Token ' + authToken },
    })
  } catch (e) {
    console.error(e)
  }
}

const guardarGaleriaFotos = async (fotos: DocumentResult[]) => {
  const paths = []
  for (let i = 0; i < fotos.length; i++) {
    let publicLink = ''
    const imagen = fotos[i] as DocumentResult
    if (imagen.type === 'cancel') {
      return
    }
    if (imagen && isDocumentResultType(imagen)) {
      publicLink = await guardarArchivo(
        FOLDERS_STORAGE.RUTAS,
        imagen.name,
        imagen.uri
      )
    }
    paths.push({
      link: publicLink,
      path: `${FOLDERS_STORAGE.RUTAS}/${imagen.name}`,
    })
  }
  return paths
}

export const getRutaById = async (authToken: string, tokenRuta: string) => {
  if (!tokenRuta) return
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/ruta/get_ruta/',
      data: { token_ruta: tokenRuta },
      headers: {
        Authorization: 'Token ' + authToken,
        'Content-Type': 'application/json',
      },
    })
    const [ruta] = response.data?.data || []
    return ruta
  } catch (e) {
    console.error(e)
  }
}

export const aprobarRuta = async (authToken: string, tokenRuta: string) => {
  if (!tokenRuta) return
  try {
    await axios({
      method: 'POST',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/ruta/aprobar_ruta/',
      data: { token_ruta: tokenRuta },
      headers: {
        Authorization: 'Token ' + authToken,
        'Content-Type': 'application/json',
      },
    })
  } catch (e) {
    console.error(e)
  }
}

export const eliminarRuta = async (authToken: string, tokenRuta: string) => {
  try {
    await axios({
      method: 'POST',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/ruta/eliminar_ruta/',
      data: { token_ruta: tokenRuta },
      headers: {
        Authorization: 'Token ' + authToken,
        'Content-Type': 'application/json',
      },
    })
  } catch (e) {
    console.error(e)
  }
}

export const inscribirUsuarioEnRuta = async (
  authToken: string,
  tokenRuta: string
) => {
  try {
    await axios({
      method: 'POST',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/ruta/inscribirse_ruta/',
      data: { token: tokenRuta },
      headers: {
        Authorization: 'Token ' + authToken,
        'Content-Type': 'application/json',
      },
    })
  } catch (e) {
    console.error(e)
  }
}

export const cancelarInscripcionUsuario = async (
  authToken: string,
  tokenRuta: string
) => {
  try {
    await axios({
      method: 'POST',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/ruta/cancelar_inscripcion/',
      data: { token: tokenRuta },
      headers: {
        Authorization: 'Token ' + authToken,
        'Content-Type': 'application/json',
      },
    })
  } catch (e) {
    console.error(e)
  }
}
