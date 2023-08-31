export const getFecha = (fecha: string) => {
  if (!fecha) return
  const date = new Date(fecha)
  const dia = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
  const minutos = date.getMinutes()
  const hora = `${date.getUTCHours()}:${minutos === 0 ? '00' : minutos}`
  return `${dia} ${hora}`
}
