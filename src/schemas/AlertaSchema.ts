import * as Yup from 'yup'

export const AlertaValidationSchema = Yup.object({
  tipo: Yup.string().required("El tipo de alerta es requerido"),
  visibilidad: Yup.array()
  .min(1, 'Debes escoger quienes veran tu alerta')
  .required('La visibilidad es requerida'),
})
