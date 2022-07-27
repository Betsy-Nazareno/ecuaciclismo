import * as Yup from 'yup'

export const ConsejoValidationSchema = Yup.object({
  informacion: Yup.string().required('El mensaje es requerido'),
})
