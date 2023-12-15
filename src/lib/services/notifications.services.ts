import axios from 'axios'
import 'dotenv/config';
interface TokenNotificacion {
  token_notificacion: string
}

export const getCiclistasToken = async (token: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${process.env.BASE_URL}/api/usuario/token_notificacion_users/`,
      headers: { Authorization: 'Token ' + token },
    })
    const arrayTokens = response.data?.data || []
    const tokensFiltered = arrayTokens?.filter(
      (token: TokenNotificacion) => token.token_notificacion
    )
    return (
      tokensFiltered?.map(
        (token: TokenNotificacion) => token.token_notificacion
      ) || []
    )
  } catch (e) {
    console.error(e)
  }
}

export const getAdminTokens = async (token: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${process.env.BASE_URL}/api/usuario/token_notificacion_admins/`,
      headers: { Authorization: 'Token ' + token },
    })
    const arrayTokens = response.data?.data || []
    const tokensFiltered = arrayTokens?.filter(
      (token: TokenNotificacion) => token.token_notificacion
    )
    return (
      tokensFiltered?.map(
        (token: TokenNotificacion) => token.token_notificacion
      ) || []
    )
  } catch (e) {
    console.error(e)
  }
}

export const getAllTokens = async (token: string) => {
  const adminTokens = await getAdminTokens(token)
  const ciclistasTokens = await getCiclistasToken(token)
  return [...adminTokens, ...ciclistasTokens]
}
