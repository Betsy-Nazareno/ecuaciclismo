import axios from "axios";
import { Bicicleta } from "../../models/Bicicletas";
import { BASE_URL } from '@env'

export const agregarBicicleta = async (
  bicicleta: Bicicleta,
  token: string,
) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${BASE_URL}/api/publicacion/get_publicaciones/`,

    })
    return response
  } catch (e) {
    console.error(e)
    throw new Error('Error interno del servidor (500)');
  }
}

export const recuperarBicicletas = async (
  token_usuario: string) => {
  const response = await axios({
    method: 'POST',
    url: `${BASE_URL}/api/publicacion/get_publicaciones/`,

  })
  return response
}
