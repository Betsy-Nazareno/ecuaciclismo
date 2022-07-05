import axios from 'axios'

interface TokenNotificacion {
  token_notificacion: string
}
export const getCiclistasToken = async (token: String) => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/usuario/token_notificacion_users/',
      headers: { Authorization: 'Token ' + token },
    })
    const arrayTokens = response.data?.data
    return (
      arrayTokens?.map(
        (token: TokenNotificacion) => token.token_notificacion
      ) || []
    )
  } catch (e) {
    console.error(e)
  }
}
