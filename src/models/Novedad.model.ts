import { ImageSourcePropType } from 'react-native'

export interface BannerNovedadInterface {
  titulo: string
  imagen?: ImageSourcePropType
  descripcion_corta: string
  token?: string
}

export interface NovedadInterface extends BannerNovedadInterface {
  descripcion: string
  nombre?: string
  celular?: string
  direccion?: string
}
