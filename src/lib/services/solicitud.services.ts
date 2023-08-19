import axios from 'axios'

export const newPlaceRequest = async (token: string, token_lugar: string, path_Pdf: string) => {
    try {
        const response = await axios({
            method: 'POST',
            url: 'https://ecuaciclismoapp.pythonanywhere.com/api/solicitud/new_solicitud_lugar/',
            data:{
                token: token,
                token_lugar: token_lugar,
                path_Pdf: path_Pdf,
            },
        })
        return response?.data?.status || ""
    } catch (e) {
        console.error(e)
    }
}
