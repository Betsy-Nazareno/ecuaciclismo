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
  cupos_disponibles: Yup.number()
    .max(RUTAS.MAX_CUPOS, 'Ingresa una cantidad de cupos valida')
    .min(RUTAS.MIN_CUPOS, 'Esta ruta debe tener al menos un participante'),

  fotos: Yup.mixed().required('Debe agregar al menos una imágen'),
  lugar: Yup.string().required('El lugar es requerido'),
  ubicacion: Yup.mixed().required(
    'Por favor, seleccione el punto de partida y destino de la ruta'
  ),
  fecha_inicio: Yup.mixed().required('La fecha es requerida'),
  fecha_fin: Yup.mixed().required('La fecha es requerida'),
  tipoRuta: Yup.array()
    .min(1, 'Debes seleccionar el tipo de ruta.')
    .required('El tipo de ruta es requerido'),
})
