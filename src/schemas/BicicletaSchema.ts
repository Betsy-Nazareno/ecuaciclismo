import * as Yup from 'yup'
export const BicicletaValidationSchema = Yup.object({
  marca: Yup.string().required('La marca es requerida'),
  imagen: Yup.mixed().required('Debe agregar al menos una imágen'),
  modelo: Yup.string().required("El modelo es requerido"),
  modalidad: Yup.string().required("La modalidad es requerido"),
  factura: Yup.string().required("La factura es requerido"),
  n_serie: Yup.string().required("El número de serie o chasis es requerido"),
  tienda_origen: Yup.string().required("La tienda donde compraste la bicicleta es requerido"),
  color: Yup.string().required("El color de tu es requerido"),
})
