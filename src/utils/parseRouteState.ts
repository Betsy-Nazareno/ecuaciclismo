
import { Estado, EstadoRuta } from '../models/Rutas'

export const getEstadoRuta = (estado: Estado | undefined): EstadoRuta => {
  if (!estado) return 'Finalizada'
  if (estado['estado_no_iniciada']) return 'Disponible'
  if (estado['estado_finalizado']) return 'Finalizada'
  if (estado['estado_sin_cupos']) return 'Sin Cupos'
  if (estado['estado_cancelado']) return 'Cancelada'
  return 'En Curso'
}

