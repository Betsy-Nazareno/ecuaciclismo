import { ImageSourcePropType } from 'react-native'

export interface BannerPublicidadInterface {
  titulo: string
  imagen?: ImageSourcePropType
  descripcion_corta: string
  token?: string
}

export interface PublicidadInterface extends BannerPublicidadInterface {
  descripcion: string
  nombre?: string
  celular?: string
  direccion?: string
}
