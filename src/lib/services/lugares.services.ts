import axios from 'axios'
import { Lugar } from '../../models/Lugares'
import { DocumentResult } from 'expo-document-picker'
import { isDocumentResultType } from '../../utils/ckeckTypes'
import { guardarArchivo } from '../googleCloudStorage'
import { FOLDERS_STORAGE } from '../../utils/constants'
import { RegistroLocalSeguro } from '../../models/RegistroLocalSeguro'


export const getLugares = async (token: string) => {
    try {
        const response = await axios({
            method: 'GET',
            url: 'https://ecuaciclismoapp.pythonanywhere.com/api/lugar/get_lugares/',
            headers: { Authorization: 'Token ' + token }
        })
        return response.data['lugares']
    } catch (e) {
        console.error(e)

    }
}

export const new_lugar = async (token: string, lugar: Lugar) => {
    try {
        const { imagen } = lugar
        let path = imagen || ''
        const document = imagen as DocumentResult
        if (document.type === 'cancel') {
            return
        }

        if (imagen && isDocumentResultType(imagen)) {
            path = await guardarArchivo(
                FOLDERS_STORAGE.LUGARES,
                document.name,
                document.uri
            )
        }
        const response = await axios({
            method: 'POST',
            url: 'https://ecuaciclismoapp.pythonanywhere.com/api/lugar/new_lugar/',
            headers: { Authorization: 'Token ' + token },
            data: {
                nombre: lugar.nombre,
                ciudad: lugar.ciudad,
                descripcion: lugar.descripcion,
                imagen: path,
                direccion: lugar.direccion,
                ubicacion: lugar.ubicacion,
                isActived: 0,
                tipo_lugar: lugar.tipo,
                servicio: lugar.servicio,
                isVerificado: 0,
                longitud: lugar.longitud,
                tarifa: lugar.tarifa,
                capacidad: lugar.capacidad
            },

        })
        const { token_lugar } = response.data || {};

        if (token_lugar) {
            return token_lugar
        } else {
            console.error('No se pudo crear el lugar')
        }

    } catch (e) {
        console.error(e)
    }
}

export const newLocalSeguro = async (authToken: string, data: RegistroLocalSeguro, isBeneficios: number, imageLink: string) => {
    try {
        const response = await axios({
            method: 'POST',
            url: 'https://ecuaciclismoapp.pythonanywhere.com/api/lugar/new_lugar/',
            headers: { Authorization: 'Token ' + authToken },
            data: {
                tipo_lugar: 'local',
                servicio: data.servicio,
                isVerificado: 1,
                parqueadero: data.parqueadero,
                celular: data.cedula,
                hora_fin: data.hora_fin,
                hora_inicio: data.hora_inicio,
                isBeneficios: isBeneficios,
                nombre: data.nombre,
                descripcion: data.descripcion,
                direccion: data.direccion,
                imagen: imageLink,
                ubicacion: data.ubicacion
            },
        })
        return { token_lugar: response?.data?.token_lugar || "", status: response?.data?.status || "" }
    } catch (e) {
        console.error(e)
    }
}

export const getLugar = async (token: string, tokenLugar: string) => {
    if (!tokenLugar) return
    try {
        const response = await axios({
            method: 'POST',
            url: 'https://ecuaciclismoapp.pythonanywhere.com/api/lugar/get_lugar/',
            data: { token_lugar: tokenLugar },
            headers: { Authorization: 'Token ' + token }
        })
        const { lugar } = response.data || {};
        if (lugar) {
            return lugar
        } else {
            console.error('No se pudo obtener el lugar')
        }
    } catch (e) {
        console.error(e)
    }
}
export const getReseñas = async (token: string, tokenLugar: string) => {
    if (!tokenLugar) return
    try {
        const response = await axios({
            method: 'POST',
            url: 'https://ecuaciclismoapp.pythonanywhere.com/api/lugar/get_reseñas/',
            data: { token_lugar: tokenLugar },
            headers: { Authorization: 'Token ' + token }
        })
        const { reseñas } = response.data || {};
        if (reseñas) {
            return reseñas
        } else {
            console.error('No se pudo obtener las reseñas')
        }
    } catch (e) {
        console.error(e)
    }
}

export const new_reseña = async (token: string, token_lugar: string, contenido: string, puntuacion_atencion: number, puntuacion_limpieza: number, puntuacion_seguridad: number) => {
    try {
        await axios({
            method: 'POST',
            url: 'https://ecuaciclismoapp.pythonanywhere.com/api/lugar/new_reseña/',
            data: { token_lugar: token_lugar, contenido: contenido, puntuacion_atencion: puntuacion_atencion, puntuacion_limpieza: puntuacion_limpieza, puntuacion_seguridad: puntuacion_seguridad },
            headers: { Authorization: 'Token ' + token }
        })
    } catch (e) {
        console.error(e)
    }
}

export const update_reseña = async (token: string, token_reseña: string, contenido: string, puntuacion_atencion: number, puntuacion_limpieza: number, puntuacion_seguridad: number) => {
    try {
        await axios({
            method: 'POST',
            url: 'https://ecuaciclismoapp.pythonanywhere.com/api/lugar/edit_reseña/',
            data: { token_reseña: token_reseña, contenido: contenido, puntuacion_atencion: puntuacion_atencion, puntuacion_limpieza: puntuacion_limpieza, puntuacion_seguridad: puntuacion_seguridad },
            headers: { Authorization: 'Token ' + token }
        })

    } catch (e) {
        console.error(e)
    }
}

export const delete_reseña = async (token: string, token_reseña: string) => {
    try {
        await axios({
            method: 'POST',
            url: 'https://ecuaciclismoapp.pythonanywhere.com/api/lugar/delete_reseña/',
            data: { token_reseña: token_reseña },
            headers: { Authorization: 'Token ' + token }
        })
    } catch (e) {
        console.error(e)
    }
}
