import * as Yup from 'yup'
export const BicicletaValidationSchema = Yup.object({
  marca: Yup.string().required('La marca es requerida'),
  codigo: Yup.string().required('El codigo es requerido'),
  imagen: Yup.mixed().required('Debe agregar al menos una imágen'),
  tipo: Yup.string().required("El tipo de alerta es requerido"),

})
