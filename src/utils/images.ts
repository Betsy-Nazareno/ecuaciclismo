/**
 * Devuelve un objeto con atributo uri para cargar la uri de la imagen que se le pasa como
 * parametro caso contrario devuelve una imagen por defecto
 * 
 * @param uri 
 * @returns 
 */
export function getImagePlaceByUri(uri: string) {
    return uri ? { uri } : require(`../../assets/tienda.png`);
}