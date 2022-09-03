import { Dimensions } from 'react-native'

export const TEXT_COLORS = {
  ORANGE: 'text-[#F16F31]',
  GRAY: 'text-[#DFDFDF]',
  DARK_GRAY: 'text-[#767676]',
  GRAY_PLACEHOLDER: 'text-[#B0B4B7]',
  PRIMARY_BLUE: 'text-[#01579B]',
  SKY_BLUE: 'text-[#2D84C4]',
  DARK_BLUE: 'text-[#0C3248]',
  GREEN_PRIMARY: 'text-[#5DB075]',
  RED: 'text-[#B00020]',
}

export const BACKGROUND_COLORS = {
  ORANGE: 'bg-[#F16F31]',
  SKY_BLUE: 'bg-[#2D84C4]',
  PRIMARY_BLUE: 'bg-[#01579B]',
  DARK_BLUE: 'bg-[#0C3248]',
  BLUE_LIGHTER: 'bg-[#F2FAFF]',
  GRAY: 'bg-[#DFDFDF]',
  GRAY_PLACEHOLDER: 'bg-[#e6e6e6]',
  GREEN: 'bg-[#D0FCE3]',
  GREEN_PRIMARY: 'bg-[#5DB075]',
  RED: 'bg-[#B00020]',
}

export const BORDER_COLORS = {
  GRAY: 'border-[#DFDFDF]',
  PRIMARY_BLUE: 'border-[#2D84C4]',
  DARK_BLUE: 'border-[#0C3248]',
  GREEN: 'border-[#5DB075]',
  ORANGE: 'border-[#F16F31]',
}

export const WIDTH_DIMENSIONS = Dimensions.get('window').width
export const HEIGHT_DIMENSIONS = Dimensions.get('window').height

export const DOCUMENT_RESULT_TYPES = {
  CANCEL: 'cancel',
  SUCCESS: 'success',
}

export const ESTADOS_RUTA = {
  DISPONIBLE: 'Disponible',
  FINALIZADA: 'Finalizada',
  CANCELADA: 'Cancelada',
  SIN_CUPOS: 'Sin Cupos',
  EN_CURSO: 'En Curso',
}

export const uri_rastreo_icon =
  'https://firebasestorage.googleapis.com/v0/b/omega-keep-354005.appspot.com/o/rutas%2Fbicicleta_marker.png?alt=media&token=ee9540cd-54cf-401a-822d-6b1920fc5102'
export const uri_meta_icon =
  'https://firebasestorage.googleapis.com/v0/b/omega-keep-354005.appspot.com/o/rutas%2Fmeta.png?alt=media&token=5da6553c-e489-4e89-9614-ce23276d04df'

export const CONSEJO_MAX_LENGTH = 100
export const PASSWORD = {
  MAX_SIZE: 16,
  MIN_SIZE: 8,
}

export const USERNAME = {
  MAX_LENGTH: 16,
  MIN_LENGTH: 3,
}

export const PUBLICIDAD = {
  DESCRIPCION_MAX_LENGTH: 500,
  DESCRIPCION_CORTA_MAX_LENGTH: 150,
}

export const PUBLICACION = {
  TITULO_MAX_LENGTH: 150,
}

export const RUTAS = {
  NOMBRE_MAX_LENGTH: 200,
  NOMBRE_MIN_LENGTH: 5,
  MAX_CUPOS: 9999999,
  MIN_CUPOS: 1,
}
export const FOLDERS_STORAGE = {
  CONSEJOS: 'consejos',
  RUTAS: 'rutas',
  PUBLICACIONES: 'publicaciones',
  NOVEDADES: 'novedades',
  USUARIOS: 'usuarios',
}

export const MIME_TYPES = {
  IMAGEN: 'imagen',
  IMAGE: 'image',
  VIDEO: 'video',
  PDF: 'application',
  AUDIO: 'audio',
}

export const etiquetasPublicaciones = [
  {
    value: 'sociales',
    nombre: 'Sociales',
    icon: require('../../assets/sociales_icon.png'),
  },
  {
    value: 'amigos',
    nombre: 'Entre Amigos',
    icon: require('../../assets/amigos_icon.png'),
  },
  {
    value: 'ciclopaseo',
    nombre: 'Ciclopaseo',
    icon: require('../../assets/ciclopaseo_icon.png'),
  },
  {
    value: 'cumpleanios',
    nombre: 'Cumpleaños',
    icon: require('../../assets/cumpleanios_icon.png'),
  },
  {
    value: 'travesia',
    nombre: 'Travesia',
    icon: require('../../assets/travesia_icon.png'),
  },
  {
    value: 'aventura',
    nombre: 'Aventura',
    icon: require('../../assets/aventura.png'),
  },
  {
    value: 'novedades',
    nombre: 'Novedades',
    icon: require('../../assets/novedad_icon.png'),
  },
  {
    value: 'entrenamiento',
    nombre: 'Entrenamiento',
    icon: require('../../assets/entrenamiento_icon.png'),
  },
  {
    value: 'paseo',
    nombre: 'Paseo',
    icon: require('../../assets/paseo_icon.png'),
  },
  {
    value: 'competencia',
    nombre: 'Competencia',
    icon: require('../../assets/competencia_icon.png'),
  },
]

export const etiquetasRutas = [
  {
    value: 'inscritas',
    nombre: 'Inscritas',
  },
  {
    value: 'disponibles',
    nombre: 'Disponibles',
  },
  {
    value: 'finalizada',
    nombre: 'Finalizada',
  },
  {
    value: 'sin_cupo',
    nombre: 'Sin Cupo',
  },
]

export const generosCatalog = [
  { nombre: 'Femenino', value: 'Femenino' },
  { nombre: 'Masculino', value: 'Masculino' },
  { nombre: 'Otro', value: 'Otro' },
]

export const nivelesCatalog = [
  { nombre: 'Nivel Básico', value: 'Nivel Básico' },
  { nombre: 'Nivel Intermedio', value: 'Nivel Intermedio' },
  { nombre: 'Nivel Avanzado', value: 'Nivel Avanzado' },
]
