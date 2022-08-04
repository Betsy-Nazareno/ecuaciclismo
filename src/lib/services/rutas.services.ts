import axios from 'axios'

export const getRequisitos = async (authToken: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'https://ecuaciclismoapp.pythonanywhere.com/api/ruta/get_requisitos/',
      headers: { Authorization: 'Token ' + authToken },
    })
    return response.data || {}
  } catch (e) {
    console.error(e)
  }
}
