import * as Yup from 'yup'
import { PUBLICACION } from '../utils/constants'
import { formatoMaxLength } from './FormatFieldFormMessages'

export const PublicacionValidationSchema = Yup.object({
  titulo: Yup.string()
    .max(
      PUBLICACION.TITULO_MAX_LENGTH,
      formatoMaxLength('El título', PUBLICACION.TITULO_MAX_LENGTH)
    )
    .required('El título es requerido'),

  etiquetas: Yup.array()
    .min(1, 'Debes relacionar al menos una etiqueta a esta publicación')
    .required('Las etiquetas son requeridas'),
  descripcion: Yup.string().required('La descripción es requerida'),
})
