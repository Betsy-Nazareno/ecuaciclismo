import { ImageSourcePropType } from 'react-native'

export interface BannerPublicidadInterface {
  titulo: string
  imagen: ImageSourcePropType
  descripcion_corta: string
}

interface DatosContacto {
  nombre: string
  celular: string
  direccion: string
}
export interface PublicidadInterface extends BannerPublicidadInterface {
  descripcion: string
  datos_contacto: DatosContacto
}
