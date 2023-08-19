import axios from 'axios'
import { RegistroLocalSeguro } from '../../models/RegistroLocalSeguro'

export const newLocalSeguro = async (authToken: string, data: RegistroLocalSeguro, isBeneficios: number, imageLink: string) => {
    try {
        const response = await axios({
            method: 'POST',
            url: 'https://ecuaciclismoapp.pythonanywhere.com/api/lugar/new_lugar/',
            headers: { Authorization: 'Token ' + authToken },
            data:{
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
        return {token_lugar: response?.data?.token_lugar || "", status: response?.data?.status || ""}
    } catch (e) {
        console.error(e)
    }
}
