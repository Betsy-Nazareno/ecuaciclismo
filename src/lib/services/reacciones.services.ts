import axios from 'axios'
import { ReaccionTypes } from '../../models/Reacciones.model'
import { BASE_URL } from '@env'
export const agregarReacciones = async (
  name: ReaccionTypes,
  token: string,
  userToken: string,
  type: 'Consejo' | 'Publicacion'
) => {
  try {
    const endpoint = {
      Consejo: 'consejodia/post_reaccion/',
      Publicacion: 'publicacion/post_reaccion/',
    }
    const data = {
      Consejo: {
        token_consejo: token,
        nombre_reaccion: name,
      },
      Publicacion: {
        token_publicacion: token,
        nombre_reaccion: name,
      },
    }

    await axios({
      method: 'POST',
      url: `${BASE_URL}/api/${endpoint[type]}`,
      data: data[type],
      headers: { Authorization: 'Token ' + userToken },
    })
  } catch (e) {
    console.error(e)
  }
}

export const eliminarReaccion = async (
  name: ReaccionTypes,
  token: string,
  userToken: string,
  type: 'Consejo' | 'Publicacion'
) => {
  try {
    const endpoint = {
      Consejo: 'consejodia/delete_detalle_reaccion_consejo/',
      Publicacion: 'publicacion/delete_detalle_reaccion_publicacion/',
    }

    const data = {
      Consejo: {
        token_consejo: token,
        nombre_reaccion: name,
      },
      Publicacion: {
        token_publicacion: token,
        nombre_reaccion: name,
      },
    }

    await axios({
      method: 'DELETE',
      url: `${BASE_URL}/api/${endpoint[type]}`,
      data: data[type],
      headers: { Authorization: 'Token ' + userToken },
    })
  } catch (e) {
    console.error(e)
  }
}
