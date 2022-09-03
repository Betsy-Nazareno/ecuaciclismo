import axios from 'axios'

interface TokenNotificacion {
  token_notificacion: string
}

export const getCiclistasToken = async (token: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/usuario/token_notificacion_users/',
      headers: { Authorization: 'Token ' + token },
    })
    const arrayTokens = response.data?.data || []
    const tokensFiltered: string[] = []
    arrayTokens?.forEach((token: TokenNotificacion) => {
      const tokenNotificacion = token.token_notificacion
      if (tokenNotificacion && !tokensFiltered.includes(tokenNotificacion)) {
        tokensFiltered.push(tokenNotificacion)
      }
    })
    return tokensFiltered
  } catch (e) {
    console.error(e)
    return []
  }
}

export const getAdminTokens = async (token: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/usuario/token_notificacion_admins/',
      headers: { Authorization: 'Token ' + token },
    })
    const arrayTokens = response.data?.data || []
    const tokensFiltered: string[] = []
    arrayTokens?.forEach((token: TokenNotificacion) => {
      const tokenNotificacion = token.token_notificacion
      if (tokenNotificacion && !tokensFiltered.includes(tokenNotificacion)) {
        tokensFiltered.push(tokenNotificacion)
      }
    })
    return tokensFiltered
  } catch (e) {
    console.error(e)
    return []
  }
}

export const getAllTokens = async (token: string) => {
  const adminTokens = await getAdminTokens(token)
  const ciclistasTokens = await getCiclistasToken(token)
  return [...adminTokens, ...ciclistasTokens]
}
