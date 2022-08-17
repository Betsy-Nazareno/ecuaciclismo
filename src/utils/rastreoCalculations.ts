const MET_CICLISMO = 7.2
const FACTOR = 0.0175

export const getSpeedKmH = (velocidad: number[]) => {
  return (
    (velocidad.reduce((sum, speed) => sum + speed, 0) /
      (velocidad.length || 1)) *
    3.6
  )
}

export const getCaloriesBurned = (duracion: number, peso: number) => {
  return peso * MET_CICLISMO * FACTOR * duracion
}
