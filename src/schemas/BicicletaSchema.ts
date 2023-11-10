import * as Yup from 'yup'
export const BicicletaValidationSchema = Yup.object({
  
  marca: Yup.string().required('La marca es requerida'),
  codigo: Yup.string().required('El codigo es requerido es requerida'),
  
  imagen: Yup.mixed().required('Debe agregar al menos una imágen'),
  tipo: Yup.array()
    .min(1, 'Debes escoger el tipo de bicicleta')
    .required('Las etiquetas son requeridas'),
  
})
