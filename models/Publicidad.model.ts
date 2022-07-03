export interface BannerPublicidad {
  titulo: string
  imagen: any
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
