
import { ImageSourcePropType } from 'react-native';
import { RutaCoordinadas } from './Alertas';

export interface Lugar {
  id?: number;
  nombre: string;
  token: string;
  descripcion: string;
  direccion: string;
  imagen: ImageSourcePropType;
  ciudad: string;
  ubicacion: RutaCoordinadas;
  isActived?: number;
  tipo: string
  local_seguro?: number;
  capacidad?: number;
  tarifa?: number;
  nombre_propietario?: string;
  apellido_propietario?: string;
  servicio?: string;
  celular?: string;
  hora_inicio?: string;
  hora_fin?: string;
  isBeneficios?: number;
  longitud?: number;
  promedio_atecion?: number;
  promedio_limpieza?: number;
  promedio_seguridad?: number;
  local_safepoint?: boolean;
}

export interface Reseña {
    contenido: string;
    puntuacion_atencion?: number;
    puntuacion_limpieza?: number;
    puntuacion_seguridad?: number;
    first_name?: string
    last_name?: string
    foto?: string;
    tipo: string;
    fecha_creacion?: string;
    token: string;
    key?: string;
  }
  