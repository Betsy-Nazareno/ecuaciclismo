import axios from "axios";
import { Bicicleta, MultimediaResult } from "../../models/Bicicletas";
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
  const uri = `${BASE_URL}/api/biclicleta/mis_bicicletas/`
  console.log(uri)
  const response = await axios({
    method: 'GET',
    url: uri,
    headers: { Authorization: 'Token ' + token_usuario },
  })
  const { data } = response.data || {}
  return converterBicicletas(data)
}

const converterBicicletas = (bicicletas: Bicicleta[]) => {
  return bicicletas.map((bici) =>
    converterBicicletaObject(bici)
  )
}
const converterBicicletaObject = (bicicleta: Bicicleta) => {
  return {
    ...bicicleta
  }
}
