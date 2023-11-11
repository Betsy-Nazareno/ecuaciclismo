import { MultimediaResult } from "./Publicaciones.model";
import * as ImagePicker from 'expo-image-picker';
export interface Bicicleta {
    tipo: string;
    marca: string;
    codigo: string;
    token_usuario: string;
    multimediaResult?: MultimediaResult[];
    imagen: ImagePicker.ImagePickerResult[];
}