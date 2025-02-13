import * as Yup from 'yup'

export const resetPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .email('Por favor, ingresa un correo electrónico válido')
    .required('Debe ingresar un correo electrónico'),
})
