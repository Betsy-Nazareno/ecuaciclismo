import axios from "axios";
import { Bicicleta } from "../../models/Bicicletas";

export const agregarBicicleta = async (
    bicicleta: Bicicleta,
    token: string,
) => {
    try {
        const response = await axios({
            method: 'POST',
            url: 'https://ecuaciclismoapp.pythonanywhere.com/api/publicacion/get_publicaciones/',

        })
        return response
    } catch (e) {
        console.error(e)
        throw new Error('Error interno del servidor (500)');
    }
}