import axios from 'axios'


export const newPlaceRequest = async (token: string, token_lugar?: string, path_Pdf?: string) => {
    try {
        const response = await axios({
            method: 'POST',
            url: 'https://ecuaciclismoapp.pythonanywhere.com/api/solicitud/new_solicitud/',
            headers: { Authorization: 'Token ' + token },
            data: {
                token_lugar: token_lugar,
                path_Pdf: path_Pdf ? path_Pdf : '',

            },
        })
        return response?.data?.status || ""
    } catch (e) {
        console.error(e)
    }
}


export const getSolicitudes = async (token: string) => {
    try {
        const response = await axios({
            method: 'GET',
            url: 'https://ecuaciclismoapp.pythonanywhere.com/api/solicitud/get_solicitudes/',
            headers: { Authorization: 'Token ' + token },
        })
        return response?.data['solicitudes']
    } catch (e) {
        console.error(e)
    }
}

export const getSolicitudById = async (token: string, token_solicitud: string) => {
    try {
        const response = await axios({
            method: 'GET',
            url: 'https://ecuaciclismoapp.pythonanywhere.com/api/solicitud/get_solicitud_by_id/',
            headers: { Authorization: 'Token ' + token },
            params: {
                token_solicitud: token_solicitud
            }
        })
        return response?.data['solicitud']
    } catch (e) {
        console.error(e)
    }
}


export const newMemberRequest = async (token: string, path_Pdf: string) => {
    try {
        const response = await axios({
            method: 'POST',
            url: 'https://ecuaciclismoapp.pythonanywhere.com/api/solicitud/new_solicitud/',
            headers: { Authorization: 'Token ' + token },
            data: {
                path_Pdf: path_Pdf,
            },
        })
        return response?.data?.status || ""
    } catch (e) {
        console.error(e)
    }
}


export const responderSolicitud = async (
    authToken: string,
    token_solicitud: string,
    estado: string,
    motivo_rechazo: string,
    tipo: string,
) => {
    try {
        await axios({
            method: 'POST',
            url: 'https://ecuaciclismoapp.pythonanywhere.com/api/solicitud/responder_solicitud/',
            data: { token_solicitud, estado, motivo_rechazo, tipo },
            headers: { Authorization: 'Token ' + authToken },
        })
    } catch (e) {
        console.error(e)
    }
}


export const newVerifiedRequest = async (token: string, description: string, image: string, users: any[]) => {
    try {
        const response = await axios({
            method: 'POST',
            url: 'https://ecuaciclismoapp.pythonanywhere.com/api/solicitud/new_solicitud_verificado/',
            headers: { Authorization: 'Token ' + token },
            data: {
                descripcion: description,
                imagen: image,
                users: users,
            },
        })
        return response?.data?.status || ""
    } catch (e) {
        console.error(e)
    }
}
