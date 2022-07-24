import { Dimensions } from 'react-native'

export const TEXT_COLORS = {
  ORANGE: 'text-[#F16F31]',
  GRAY: 'text-[#DFDFDF]',
  DARK_GRAY: 'text-[#767676]',
  PRIMARY_BLUE: 'text-[#01579B]',
  SKY_BLUE: 'text-[#2D84C4]',
  DARK_BLUE: 'text-[#0C3248]',
}

export const BACKGROUND_COLORS = {
  ORANGE: 'bg-[#F16F31]',
  SKY_BLUE: 'bg-[#2D84C4]',
  PRIMARY_BLUE: 'bg-[#01579B]',
  DARK_BLUE: 'bg-[#0C3248]',
  BLUE_LIGHTER: 'bg-[#F2FAFF]',
  GRAY: 'bg-[#DFDFDF]',
  GREEN: 'bg-[#D0FCE3]',
}

export const BORDER_COLORS = {
  GRAY: 'border-[#DFDFDF]',
  PRIMARY_BLUE: 'border-[#2D84C4]',
  GREEN: 'border-[#5DB075]',
  ORANGE: 'border-[#F16F31]',
}

export const WIDTH_DIMENSIONS = Dimensions.get('window').width
export const HEIGHT_DIMENSIONS = Dimensions.get('window').height

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

export const FOLDERS_STORAGE = {
  CONSEJOS: 'consejos',
  RUTAS: 'rutas',
  PUBLICACIONES: 'publicaciones',
  NOVEDADES: 'novedades',
}

export const etiquetasPublicaciones = [
  {
    value: 'placeholder',
    label: 'Recomendaciones, Ofertas...',
    icon: '',
    enabled: false,
  },
  {
    value: 'recomendaciones',
    label: 'Recomendaciones',
    icon: require('../../assets/recomendacion_icon.png'),
    enabled: true,
  },
  {
    value: 'salud',
    label: 'Salud',
    icon: require('../../assets/salud_icon.png'),
    enabled: true,
  },
  {
    value: 'felicitaciones',
    label: 'Felicitaciones',
    icon: require('../../assets/celebracion_icon.png'),
    enabled: true,
  },
  {
    value: 'peligro',
    label: 'Peligro',
    icon: require('../../assets/peligro_icon.png'),
    enabled: true,
  },
]
