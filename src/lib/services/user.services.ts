import axios from 'axios'

import { Registro } from '../../models/User'
import { BASE_URL } from '@env'
export const createUser = async (data: Registro, tokenNotification: string) => {
  try {
    await axios({
      method: 'POST',
      url: `${BASE_URL}/api/usuario/crear_usuario/`,
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
      url: `${BASE_URL}/api/ruta/get_not_response/`,
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
      url: `${BASE_URL}/api/ruta/safe_in_home/`,
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
      url: `${BASE_URL}/api/usuario/get_detalle_usuario/`,
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


export const enviarDatosUsuarios = async (
  authToken: string,
  updatedUser: any
) => {
  try {

    const response = await axios({
      method: 'POST',
      data: {
        ...updatedUser,
      },
      url: `${BASE_URL}/api/usuario/editar_usuario/`,
      headers: { Authorization: 'Token ' + authToken },
    })
    return response;
  } catch (e) {
    console.error(e)
  }
}

export const getComunidad = async (authToken: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${BASE_URL}/api/usuario/get_usuarios/`,
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
      url: `${BASE_URL}/api/usuario/get_contactos_seguros/`,
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
      url: `${BASE_URL}/api/usuario/agregar_contacto_seguro/`,
      headers: { Authorization: 'Token ' + authToken },
      data: {
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
      url: `${BASE_URL}/api/usuario/delete_contacto_seguro/`,
      data: { token_contacto: authToken },
    })
    return response?.data?.message || ""
  } catch (e) {
    console.error(e)
  }
}

export const recuperarContrasena = async (email: string) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${BASE_URL}/api/recuperar_credenciales/enviar_email_recuperacion_clave/`,
      data: {
        email: email,
      },
    })
    return response;
  } catch (e) {

    console.error(e)
    throw new Error('Error interno del servidor (500)');

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
      url: `${BASE_URL}/api/usuario/setear_admin/`,
      data: { token_usuario: usuarioToken, admin: isAdmin },
      headers: { Authorization: 'Token ' + adminToken },
    })
  } catch (e) {
    console.error(e)
  }
}
