import * as Yup from 'yup'
import { USERNAME } from '../utils/constants'
import {
  formatoMaxLength,
  formatoMinLenght,
  formatOnlyText,
} from './FormatFieldFormMessages'

export const usuarioValidationSchema = Yup.object({
  nombre: Yup.string()
    .matches(/^[aA-zZ\s]+$/, formatOnlyText('El nombre'))
    .required('El nombre es requerido'),
  apellido: Yup.string()
    .matches(/^[aA-zZ\s]+$/, formatOnlyText('El apellido'))
    .required('El apellido es requerido'),
  edad: Yup.number(),
  peso: Yup.number(),
  usuario: Yup.string()
    .max(
      USERNAME.MAX_LENGTH,
      formatoMaxLength('El nombre de usuario', USERNAME.MAX_LENGTH)
    )
    .min(
      USERNAME.MIN_LENGTH,
      formatoMinLenght('El nombre de usuario', USERNAME.MIN_LENGTH)
    )
    .required('Debe ingresar un nombre de usuario'),
  email: Yup.string()
    .email('Por favor, ingresa un correo electrónico válido')
    .required('Debe ingresar un correo electrónico'),
})
