export interface Etiqueta {
  value: string
  nombre: string
}

export interface SelectPickerValues extends Etiqueta {
  enabled?: boolean
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
