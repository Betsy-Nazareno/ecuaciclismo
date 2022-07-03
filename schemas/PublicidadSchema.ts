import * as Yup from 'yup'
import { PUBLICIDAD } from '../utils/constants'
import { formatoMaxLength, formatoRequerido } from './FormatFieldFormMessages'

export const PublicidadValidationSchema = Yup.object({
  titulo: Yup.string().required(
    'Debes ingresar un titulo para esta publicidad'
  ),
  imagen: Yup.mixed().required('Debe agregar al menos una imágen'),
  descripcion: Yup.string()
    .max(
      PUBLICIDAD.MAX_LENGTH,
      formatoMaxLength('La descripción', PUBLICIDAD.MAX_LENGTH)
    )
    .required(formatoRequerido('La descripcion')),
})
