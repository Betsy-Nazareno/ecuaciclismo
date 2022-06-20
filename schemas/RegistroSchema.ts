import * as Yup from 'yup'
import { formatoRequerido } from './FormatFieldFormMessages'

export const registroValidationSchema = Yup.object({
  first_name: Yup.string().required(formatoRequerido('Nombre')),
  last_name: Yup.string().required(formatoRequerido('Apellido')),
  email: Yup.string().required(formatoRequerido('Correo')),
  password: Yup.string().required(formatoRequerido('Contraseña')),
  password_confirmation: Yup.string().required(
    'Debe confirmar la contraseña ingresada'
  ),
})
