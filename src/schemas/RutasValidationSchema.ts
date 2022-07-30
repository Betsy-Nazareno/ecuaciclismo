import * as Yup from 'yup'
import { RUTAS } from '../utils/constants'
import { formatoMaxLength, formatoMinLenght } from './FormatFieldFormMessages'

export const RutasValidationSchema = Yup.object({
  nombre: Yup.string()
    .max(
      RUTAS.NOMBRE_MAX_LENGTH,
      formatoMaxLength('El nombre de la ruta', RUTAS.NOMBRE_MAX_LENGTH)
    )
    .min(
      RUTAS.NOMBRE_MIN_LENGTH,
      formatoMinLenght('El nombre de la ruta', RUTAS.NOMBRE_MIN_LENGTH)
    )
    .required('Por favor, ingresa el nombre de la ruta'),
  cupos: Yup.number()
    .required(
      'Por favor, ingresa la cantidad de cupos disponibles para esta ruta'
    )
    .max(RUTAS.MAX_CUPOS, 'Ingresa una cantidad de cupos valida')
    .min(RUTAS.MIN_CUPOS, 'Esta ruta debe tener al menos un participante'),

  fotos: Yup.mixed().required('Debe agregar al menos una imágen'),
  lugar: Yup.string().required('El lugar es requerido'),
  ubicacion: Yup.mixed().required(
    'Por favor, seleccione el punto de partida y destino de la ruta'
  ),
  fecha: Yup.mixed().required('La fecha es requerida'),
})
