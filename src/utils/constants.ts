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
  WHITE: 'text-[#FFFFFF]',
  YELLOW: 'text-[#FFD700]',

}

export const BACKGROUND_COLORS = {
  ORANGE: 'bg-[#F16F31]',
  SKY_BLUE: 'bg-[#2D84C4]',
  PRIMARY_BLUE: 'bg-[#01579B]',
  DARK_BLUE: 'bg-[#0C3248]',
  BLUE_LIGHTER: 'bg-[#F2FAFF]',
  GRAY: 'bg-[#DFDFDF]',
  GRAY_PLACEHOLDER: 'bg-[#e6e6e6]',
  DARK_GRAY: 'bg-[#4C4C4C]',
  GREEN: 'bg-[#D0FCE3]',
  GREEN_PRIMARY: 'bg-[#5DB075]',
  GREEN_SECONDARY: 'bg-[#38AA59]',
  RED: 'bg-[#B00020]',
  WHITE: 'bg-[#FFFFFF]',
  YELLOW: 'bg-[#FFD700]',
  WHITE2: 'bg-[#DADADA]',

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
export const ESTADOS_ALERTA = {
  CANCELADA: 'Cancelada',
  ATENDIDA: 'Atendida',
  EN_CURSO: 'En curso',
}
export const ESTADOS_SOLICITUD = {
  RECHAZADA: 'Rechazada',
  PENDIENTE: 'Pendiente',
  APROBADA: 'Aprobada',
}

export const TIPOS_LUGARES = {
  PARQUEADERO: 'parqueadero',
  CICLOVIA: 'ciclovia',
  LOCAL: 'local',
  LOCAL_SEGURO: 'local seguro',
}

export const uri_rastreo_icon =
  'https://firebasestorage.googleapis.com/v0/b/omega-keep-354005.appspot.com/o/rutas%2Fbicicleta_marker.png?alt=media&token=ee9540cd-54cf-401a-822d-6b1920fc5102'
export const uri_meta_icon =
  'https://firebasestorage.googleapis.com/v0/b/omega-keep-354005.appspot.com/o/rutas%2Fmeta.png?alt=media&token=5da6553c-e489-4e89-9614-ce23276d04df'
export const uri_perfil_icon =
'https://firebasestorage.googleapis.com/v0/b/omega-keep-354005.appspot.com/o/usuarios%2Fuser.png?alt=media&token=646d4b60-b175-4ff1-85a0-25493710df24'

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

export const REGISTROLOCALSEGURO = {
  NOMBRE_MAX_LENGTH: 100,
  NOMBRE_MIN_LENGTH: 2,
  DESCRIPCION_CORTA_MAX_LENGTH: 500,
  DESCRIPCION_CORTA_MIN_LENGTH: 5,
}

export const FOLDERS_STORAGE = {
  CONSEJOS: 'consejos',
  RUTAS: 'rutas',
  PUBLICACIONES: 'publicaciones',
  NOVEDADES: 'novedades',
  USUARIOS: 'usuarios',
  ALERTAS: 'alertas',
  LUGARES: 'lugares',
}

export const MIME_TYPES = {
  IMAGEN: 'imagen',
  IMAGE: 'image',
  VIDEO: 'video',
  PDF: 'application',
  AUDIO: 'audio',
}
export const tiposDeLugares = [
  {
    value: 'Parqueadero',
    nombre: 'parqueadero',
    icon: require('../../assets/parqueadero.png'),
  },
  {
    value: 'Ciclovia',
    nombre: 'ciclovia',
    icon: require('../../assets/ciclovia.png'),
  },
  {
    value: 'Local',
    nombre: 'local',
    icon: require('../../assets/local.png'),
  },
  {
    value: 'Local Seguro',
    nombre: 'local seguro',
    icon: require('../../assets/localSeguro.png'),
  },
]
export const tipoLugar = [
  {
    value: 'parqueadero',
    nombre: 'Parqueadero',
  },
  {
    value: 'ciclovia',
    nombre: 'Ciclovia',
  },
  {
    value: 'local',
    nombre: 'Local',
  },
]
export const tipoServicio = [
  {
    value: 'Tienda',
    nombre: 'Tienda',
  },
  {
    value: 'Taller',
    nombre: 'Taller',
  },
  {
    value: 'Alquiler de bicicletas',
    nombre: 'Alquiler de bicicletas',
  },
]

export const etiquetasPublicaciones = [
  {
    value: 'recomendaciones',
    nombre: 'Recomendaciones',
    icon: require('../../assets/recomendacion_icon.png'),
  },
  {
    value: 'salud',
    nombre: 'Salud',
    icon: require('../../assets/salud_icon.png'),
  },
  {
    value: 'felicitaciones',
    nombre: 'Felicitaciones',
    icon: require('../../assets/celebracion_icon.png'),
  },
  {
    value: 'peligro',
    nombre: 'Peligro',
    icon: require('../../assets/peligro_icon.png'),
  },
  {
    value: 'noticias',
    nombre: 'Noticias',
    icon: require('../../assets/peligro_icon.png'),
  },
]

export const tipoSolicitudes = [
  {
    value: 'Registro Local',
    nombre: 'Registro Local',
  },
  {
    value: 'Membresia',
    nombre: 'Membresia',
  },
  {
    value: 'Recomendados',
    nombre: 'Recomendados',
  },
  {
    value: 'Verificacion',
    nombre: 'Verificacion',
  },
]

export const tipoAlertas=[
  {
    value: 'tubo bajo',
    nombre: 'Tubo bajo',

  },
  {
    value: 'accidente',
    nombre: 'Accidente',
  },
  {
    value: 'robo',
    nombre: 'Robo',
  },
  {
    value: 'informativa',
    nombre: 'Informativa',
  }

]

export const tiposUsuarios = [
  {
    value: 'Contactos seguros',
    nombre: 'Contactos seguros',

  },
  {
    value: 'Verificados',
    nombre: 'Verificados',
  },
  {
    value: 'Miembros',
    nombre: 'Miembros',
  },
]

export const etiquetasAlertas=[
  {
    value: 'mis alertas',
    nombre: 'Alertas enviadas',
    icon: require('../../assets/my_alert_white.png'),
  },
]

export const serviciosTipos = [
  {
    value: 'Tienda',
    nombre: 'Tienda',

  },
  {
    value: 'Taller',
    nombre: 'Taller',
  },
  {
    value: 'Alquiler de bicicletas',
    nombre: 'Alquiler de biciletas',
  },
]

export const comunityContactsLabels = [
  {
    value: 'Verificado',
    nombre: 'Verificado',
  },
  {
    value: 'Miembro',
    nombre: 'Miembro',
  },
  {
    value: 'Administrador',
    nombre: 'Administrador',
  },
]

export const etiquetasUserTypes = [
  {
    value: 'No verificado',
    nombre: 'No verificado',
  },
  {
    value: 'Verificado',
    nombre: 'Verificado',
  },
  {
    value: 'Miembro',
    nombre: 'Miembro',
  },
  {
    value: 'Administrador',
    nombre: 'Administrador',
  },
]

//Images routes for ConfirmationPopUp
export const imagesRoutes = {
  'green_check': require('../../assets/green_check.png'),
  'bin_icon': require('../../assets/bin_icon.png'),
  'Miembro': require('../../assets/miembro.png'),
  'Verificado': require('../../assets/verificado.png'),
  'verificacion_envio': require('../../assets/verificacion_envio.png'),
  'caution': require('../../assets/caution.png'),
}

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
