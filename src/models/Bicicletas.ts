import * as ImagePicker from 'expo-image-picker';

export interface Bicicleta {
    id?: string;
    tipo: string;
    marca: string;
    token_usuario?: string;
    imagenes?: MultimediaResult[];
    imagen: ImagePicker.ImagePickerResult[];
    //imagen: DocumentResult[];
}
export interface MultimediaResult {
    imagen_url: string
}
