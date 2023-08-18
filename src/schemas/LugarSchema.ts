import * as Yup from 'yup';

export const LugarValidationSchema = Yup.object({
  nombre: Yup.string().required('El nombre del lugar es requerido'),
  tipo: Yup.string().required('El tipo de lugar es requerido'),
  descripcion: Yup.string().required('La descripción es requerida'),
  ciudad: Yup.string().required('La ciudad es requerida')
});
