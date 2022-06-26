import axios from 'axios'
import { Consejo } from '../../models/Consejo.model'

export const agregarConsejo = async (consejo: Consejo, token: string) => {
  try {
    await axios({
      method: 'POST',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/consejodia/new_consejo_dia/',
      data: consejo,
      headers: { Authorization: 'Token ' + token },
    })
  } catch (e) {
    console.error(e)
  }
}

export const editarConsejo = async (
  consejo: Consejo,
  token: string,
  tokenConsejo: string
) => {
  try {
    await axios({
      method: 'POST',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/consejodia/update_consejo_dia/',
      data: { ...consejo, token: tokenConsejo },
      headers: { Authorization: 'Token ' + token },
    })
  } catch (e) {
    console.error(e)
  }
}

export const obtenerConsejos = async (token: string, api: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: api,
      headers: { Authorization: 'Token ' + token },
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
