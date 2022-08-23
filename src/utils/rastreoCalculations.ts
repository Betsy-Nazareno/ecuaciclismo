import { getDistance } from 'geolib'

const MET_CICLISMO = 7.2
const FACTOR = 0.0175

//Recibo la duración en horas, así que la convierto en minutos para este calculo
export const calcularKcalorias = (duracion: number, peso: number) => {
  return peso * MET_CICLISMO * FACTOR * (duracion * 60)
}

export const calcularDistancia = (coordinateX: any, coordinateY: any) => {
  return getDistance(
    {
      latitude: coordinateX?.latitude,
      lng: coordinateX?.longitude,
    },
    { latitude: coordinateY?.latitude, longitude: coordinateY?.longitude }
  )
}

export const calcularVelocidadPromedio = (velocidades: number[]) => {
  const filterParadas = velocidades.filter((velocidad) => velocidad !== 0)
  const total = filterParadas.reduce((sum, velocidad) => sum + velocidad, 0)
  return (total / (filterParadas.length || 1)) * 3.6
}

export const calcularTiempoRecorrido = (timestamp: number[]) => {
  const startTimestamp = timestamp[0] || 0
  const endTimestamp = timestamp[timestamp.length - 1] || 0
  const timestampRecorrido = endTimestamp - startTimestamp
  return timestampRecorrido * (1 / 1000) * (1 / 60) * (1 / 60)
}

export const getHorasEstimadas = (fecha_inicio?: any, fecha_fin?: any) => {
  const dateStart = new Date(fecha_inicio || '')
  const dateEnd = new Date(fecha_fin || '')
  return Math.ceil(
    ((dateEnd.getTime() - dateStart.getTime()) / 1000) * (1 / 60) * (1 / 60)
  )
}
