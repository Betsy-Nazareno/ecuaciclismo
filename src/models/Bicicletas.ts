import { MultimediaResult } from "./Publicaciones.model";
import { ImageSourcePropType } from 'react-native'
export interface Bicicleta {
    tipo: string;
    marca: string;
    codigo: string;
    token_usuario?: string;
    multimediaResult?: MultimediaResult[];
    imagen?: ImageSourcePropType;
    //imagen: DocumentResult[];
}