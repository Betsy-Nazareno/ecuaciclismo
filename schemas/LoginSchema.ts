import * as Yup from 'yup'
import { formatoRequerido } from './FormatFieldFormMessages'

export const loginValidationSchema = Yup.object({
  email: Yup.string().required(formatoRequerido('Correo')),
  password: Yup.string().required(formatoRequerido('Contraseña')),
})
