import * as ImagePicker from 'expo-image-picker';

export interface Bicicleta {
    id?: string;
    modelo: string;
    marca: string;
    modalidad: string;
    n_serie: string;
    tienda_origen: string;
    factura: string;
    color: string;
    token_usuario?: string;
    imagenes?: MultimediaResult[];
    imagen: ImagePicker.ImagePickerResult[];
    //imagen: DocumentResult[];
}
export interface MultimediaResult {
    imagen_url: string
}
