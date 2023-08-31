import { DocumentResult } from 'expo-document-picker'

export interface RegistroMiembro {
    nombre: string,
    num_ced: string,
    fecha_nacimiento: string,
    celular: string,
    direccion: string,
    ciudad: string,
    ocupacion: string,
    seguro_med: string,
    tipo_sangre: string,
    contacto_emergencia: string,
    payment: DocumentResult[],
    cedula: DocumentResult[],
    imagen: DocumentResult[],
}
