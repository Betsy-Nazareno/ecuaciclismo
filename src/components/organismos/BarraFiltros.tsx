import * as React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import tw from 'twrnc'
import { BuildFiltro } from '../../models/Etiqueta.model'
import { Filtro } from '../../models/Publicaciones.model'
import { BACKGROUND_COLORS } from '../../utils/constants'
import CancelButton from '../atomos/CancelButton'
import FiltroFecha from '../atomos/FiltroFecha'
import Gap from '../atomos/Gap'
import Badge from '../moleculas/Badge'

interface BarraFiltrosProps {
  filtros: Filtro[]
}

const BarraFiltros = ({ filtros }: BarraFiltrosProps) => {
  const [buildFiltros, setBuildFiltros] = React.useState<BuildFiltro>({})

  const handleDate = (date: Date | undefined) => {
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

  const isSelected = (value: string) => {
    return buildFiltros.etiquetas?.includes(value)
  }

  const getBackgroundColor = (value: string) => {
    return isSelected(value)
      ? BACKGROUND_COLORS.SKY_BLUE
      : BACKGROUND_COLORS.ORANGE
  }

  return (
    <ScrollView
      horizontal
      style={tw`my-2 py-4 mx-4 flex flex-row overflow-hidden`}
    >
      <Gap px="1">
        <FiltroFecha setDate={handleDate} date={buildFiltros.fecha} />
      </Gap>
      {filtros.map((filtro) => {
        const { icon, value, label } = filtro
        const backgoundColor = getBackgroundColor(value)
        return (
          <Gap key={filtro.value} px="1">
            <Badge
              label={label}
              name={value}
              icon={icon}
              backgroundColor={backgoundColor}
              handleClick={handleEtiquetas}
            />
            {isSelected(value) && <CancelButton />}
          </Gap>
        )
      })}
    </ScrollView>
  )
}

export default BarraFiltros
