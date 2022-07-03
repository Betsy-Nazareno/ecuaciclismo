import { ImageSourcePropType } from 'react-native'

export interface BannerPublicidad {
  titulo: string
  imagen: ImageSourcePropType
  descripcion_corta: string
}

interface DatosContacto {
  nombre: string
  celular: string
  direccion: string
}
export interface Publicidad extends BannerPublicidad {
  descripcion: string
  datos_contacto: DatosContacto
}
