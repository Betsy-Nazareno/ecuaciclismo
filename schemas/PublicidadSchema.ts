import * as Yup from 'yup'
import { PUBLICIDAD } from '../utils/constants'
import { formatoMaxLength } from './FormatFieldFormMessages'

export const PublicidadValidationSchema = Yup.object({
  titulo: Yup.string().required('Debes ingresar un titulo para esta novedad'),
  imagen: Yup.mixed().required('Debe agregar al menos una imágen'),
  descripcion: Yup.string()
    .max(
      PUBLICIDAD.DESCRIPCION_MAX_LENGTH,
      formatoMaxLength('La descripción', PUBLICIDAD.DESCRIPCION_MAX_LENGTH)
    )
    .required('Agrega una descripción para esta novedad'),
  descripcion_corta: Yup.string()
    .max(
      PUBLICIDAD.DESCRIPCION_CORTA_MAX_LENGTH,
      formatoMaxLength(
        'La descripción',
        PUBLICIDAD.DESCRIPCION_CORTA_MAX_LENGTH
      )
    )
    .required('Agrega una breve descripción de esta novedad'),
})
