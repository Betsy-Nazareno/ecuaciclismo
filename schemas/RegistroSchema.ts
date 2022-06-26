import * as Yup from 'yup'
import { PASSWORD, USERNAME } from '../utils/constants'
import {
  formatoMaxLength,
  formatoMinLenght,
  formatOnlyText,
} from './FormatFieldFormMessages'

export const registroValidationSchema = Yup.object({
  first_name: Yup.string()
    .matches(/^[aA-zZ]+$/, formatOnlyText('El nombre'))
    .required('El nombre es requerido'),
  last_name: Yup.string()
    .matches(/^[aA-zZ]+$/, formatOnlyText('El apellido'))
    .required('El apellido es requerido'),
  username: Yup.string()
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
  password: Yup.string()
    .max(
      PASSWORD.MAX_SIZE,
      formatoMaxLength('La contraseña', PASSWORD.MAX_SIZE)
    )
    .min(
      PASSWORD.MIN_SIZE,
      formatoMinLenght('La contraseña', PASSWORD.MIN_SIZE)
    )
    .required('Debe ingresar una contraseña'),
  password_confirmation: Yup.string()
    .test(
      'passwords-match',
      'Las contraseñas deben coincidir',
      function (value) {
        return this.parent.password === value
      }
    )
    .required('Debe confirmar la contraseña ingresada'),
})
