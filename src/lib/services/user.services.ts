import axios from 'axios'
import { DocumentResult } from 'expo-document-picker'
import { Registro, User } from '../../models/User'
import { isDocumentResultType } from '../../utils/ckeckTypes'
import { FOLDERS_STORAGE } from '../../utils/constants'
import { guardarArchivo } from '../googleCloudStorage'

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

export const getRutasSinConfirmar = async (authToken: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/ruta/get_not_response/',
      headers: { Authorization: 'Token ' + authToken },
    })
    return response?.data?.data?.[0]
  } catch (e) {
    console.error(e)
  }
}

export const confirmarSafeInHome = async (
  authToken: string,
  tokenRuta: string,
  safe: boolean
) => {
  try {
    await axios({
      method: 'POST',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/ruta/safe_in_home/',
      headers: { Authorization: 'Token ' + authToken },
      data: { token_ruta: tokenRuta, safe },
    })
  } catch (e) {
    console.error(e)
  }
}

export const getDetalleUsuario = async (
  authToken: string,
  userToken: string
) => {
  try {
    const response = await axios({
      method: 'POST',
      data: { token_usuario: userToken },
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/usuario/get_detalle_usuario/',
      headers: { Authorization: 'Token ' + authToken },
    })

    const [detalle] = response?.data?.data || []
    return converterUsuario(detalle)
  } catch (e) {
    console.error(e)
  }
}

const converterUsuario = (user: any) => {
  return {
    ...user,
    rutas_interes: user?.etiquetas.map((etiqueta: any) => etiqueta.token) || [],
  }
}

export const updateUser = async (
  authToken: string,
  updatedUser: Partial<User>
) => {
  try {
    await axios({
      method: 'POST',
      data: {
        ...updatedUser,
        usuario: updatedUser.username,
        nombre: updatedUser.first_name,
        apellido: updatedUser.last_name,
      },
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/usuario/editar_usuario/',
      headers: { Authorization: 'Token ' + authToken },
    })
  } catch (e) {
    console.error(e)
  }
}

export const enviarDatosUsuarios = async (
  authToken: string,
  updatedUser: any
) => {
  try {
    const { foto_bicicleta = {} } = updatedUser || {}
    const document = foto_bicicleta as DocumentResult
    if (document.type === 'cancel') {
      return
    }

    let path = foto_bicicleta
    if (foto_bicicleta && isDocumentResultType(foto_bicicleta)) {
      path = await guardarArchivo(
        FOLDERS_STORAGE.USUARIOS,
        document.name,
        document.uri
      )
    }
    await axios({
      method: 'POST',
      data: {
        ...updatedUser,
        foto_bicicleta: path,
      },
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/usuario/editar_usuario/',
      headers: { Authorization: 'Token ' + authToken },
    })
  } catch (e) {
    console.error(e)
  }
}

export const getComunidad = async (authToken: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/usuario/get_usuarios/',
      headers: { Authorization: 'Token ' + authToken },
    })
    return response?.data?.data || []
  } catch (e) {
    console.error(e)
  }
}

export const getContactosSeguros = async (authToken: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/usuario/get_contactos_seguros/',
      headers: { Authorization: 'Token ' + authToken },
    })
    return response?.data?.data || []
  } catch (e) {
    console.error(e)
  }
}

export const addContactoSeguro = async (authToken: string, user: number, id: number, name: string, phone: string) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/usuario/agregar_contacto_seguro/',
      headers: { Authorization: 'Token ' + authToken },
      data:{
              isUser: user,
              user_id: id,
              nombre: name,
              celular: phone
           },
    })
    return response?.data?.message || ""
  } catch (e) {
    console.error(e)
  }
}

export const deleteContactoSeguro = async (authToken: string) => {
  try {
    const response = await axios({
      method: 'DELETE',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/usuario/delete_contacto_seguro/',
      data: { token_contacto: authToken },
    })
    return response?.data?.message || ""
  } catch (e) {
    console.error(e)
  }
}

export const cambiarPermiso = async (
  usuarioToken: string,
  isAdmin: boolean,
  adminToken: string
) => {
  try {
    await axios({
      method: 'POST',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/usuario/setear_admin/',
      data: { token_usuario: usuarioToken, admin: isAdmin },
      headers: { Authorization: 'Token ' + adminToken },
    })
  } catch (e) {
    console.error(e)
  }
}
