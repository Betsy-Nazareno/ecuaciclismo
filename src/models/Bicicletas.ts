
import { DocumentResult } from 'expo-document-picker'
export interface Bicicleta {
    tipo: string;
    marca: string;
    codigo: string;
    token_usuario?: string;
    imagenes?: MultimediaResult[];
    multimedia: DocumentResult[]
    //imagen: DocumentResult[];
}
export interface MultimediaResult {
    imagen_url: string
}
  