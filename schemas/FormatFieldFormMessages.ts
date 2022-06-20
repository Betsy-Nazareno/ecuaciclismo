export const FormatoCorreo = (fieldName: string): string => {
  return `Ingrese un ${fieldName} válido`
}

export const formatoRequerido = (
  fieldName: string,
  isPlural = false
): string => {
  return `${fieldName} ${isPlural ? 'son requeridos' : 'es requerido'}`
}

export const formatoMinLenghtItems = (
  fieldName: string,
  minLength: number
): string => {
  return `Escoge al menos ${minLength} item(s) para ${fieldName}.`
}

export const formatoMinLenght = (
  fieldName: string,
  minLength: number
): string => {
  return `${fieldName} debe ser de al menos ${minLength} caracteres.`
}

export const formatoMaxLength = (
  fieldName: string,
  maxLength: number
): string => {
  return `${fieldName} no puede exceder ${maxLength} caracteres.`
}
