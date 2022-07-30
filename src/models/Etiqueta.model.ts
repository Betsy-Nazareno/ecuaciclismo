export interface Etiqueta {
  value: string
  nombre: string
}

export interface BuildFiltro {
  fecha?: number
  etiquetas?: string[]
}

export type ValuesEtiquetaPublicacion =
  | 'recomendaciones'
  | 'felicitaciones'
  | 'peligro'
  | 'salud'
  | 'noticia'
