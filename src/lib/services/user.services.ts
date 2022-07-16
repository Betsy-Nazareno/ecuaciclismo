import axios from 'axios'
import { Registro } from '../../models/User'

export const createUser = async (data: Registro, tokenNotification: string) => {
  try {
    await axios({
      method: 'POST',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/usuario/crear_usuario/',
      data: {
        usuario: data.username,
        email: data.email,
        password: data.password,
        nombre: data.first_name,
        apellido: data.last_name,
        token_notificacion: tokenNotification,
      },
    })
  } catch (e) {
    console.error(e)
  }
}
