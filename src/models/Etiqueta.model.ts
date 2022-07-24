export interface Etiqueta {
  value: string
  label: string
}

export interface SelectPickerValues extends Etiqueta {
  enabled?: boolean
}

export interface BuildFiltro {
  fecha?: Date
  etiquetas?: string[]
}
