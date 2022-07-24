import { useState } from 'react'
import { BuildFiltro } from '../models/Etiqueta.model'

export const useSearchWithFilters = () => {
  const [buildFiltros, setBuildFiltros] = useState<BuildFiltro>({})
  const [text, setText] = useState('')

  const handleDate = (date: number | undefined) => {
    setBuildFiltros({ ...buildFiltros, fecha: date })
  }

  const handleEtiquetas = (name: string) => {
    const { etiquetas = [] } = buildFiltros
    if (etiquetas?.includes(name)) {
      const filteredEtiquetas = etiquetas.filter(
        (etiqueta) => etiqueta !== name
      )
      setBuildFiltros({ ...buildFiltros, etiquetas: filteredEtiquetas })
    } else {
      setBuildFiltros({
        ...buildFiltros,
        etiquetas: [...etiquetas, name],
      })
    }
  }

  return {
    buildFiltros,
    text,
    setText,
    handleDate,
    handleEtiquetas,
  }
}
