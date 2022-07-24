import { etiquetasPublicaciones } from './constants'

export const getEtiquetaPublicacionesByName = (name: string) => {
  return etiquetasPublicaciones.find((etiqueta) => etiqueta.value === name)
}
