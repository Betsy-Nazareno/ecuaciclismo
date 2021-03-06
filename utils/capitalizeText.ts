export const capitalize = (text: string | undefined) => {
  if (text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }
  return ''
}
