import axios from 'axios'
import { Registro } from '../../models/User'

export const createUser = async (data: Registro) => {
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
      },
    })
  } catch (e) {
    console.error(e)
  }
}
