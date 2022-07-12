import axios from 'axios'
import { ReaccionTypes } from '../../models/Reacciones.model'

export const agregarReacciones = async (
  name: ReaccionTypes,
  token: string,
  userToken: string
) => {
  try {
    await axios({
      method: 'POST',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/consejodia/post_reaccion/',
      data: { token_consejo: token, nombre_reaccion: name },
      headers: { Authorization: 'Token ' + userToken },
    })
  } catch (e) {
    console.error(e)
  }
}

export const eliminarReaccion = async (
  name: ReaccionTypes,
  token: string,
  userToken: string
) => {
  try {
    await axios({
      method: 'DELETE',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/consejodia/delete_detalle_reaccion_consejo/',
      data: { token_consejo: token, nombre_reaccion: name },
      headers: { Authorization: 'Token ' + userToken },
    })
  } catch (e) {
    console.error(e)
  }
}
