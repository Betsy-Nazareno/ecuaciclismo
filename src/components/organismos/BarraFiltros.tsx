import * as React from 'react'
import tw from 'twrnc'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { Filtro } from '../../models/Publicaciones.model'
import { setDate, setEtiquetas } from '../../redux/publicacionBusqueda'
import { RootState } from '../../redux/store'
import { BACKGROUND_COLORS } from '../../utils/constants'
import CancelButton from '../atomos/CancelButton'
import FiltroFecha from '../atomos/FiltroFecha'
import Gap from '../atomos/Gap'
import Badge from '../moleculas/Badge'

interface BarraFiltrosProps {
  filtros: Filtro[]
  icons?: boolean
}

const BarraFiltros = ({ filtros, icons = true }: BarraFiltrosProps) => {
  const { buildFiltros } = useSelector((state: RootState) => state.busqueda)
  const dispatch = useDispatch()

  const isSelected = (value: string) => {
    return buildFiltros.etiquetas?.includes(value)
  }

  const getBackgroundColor = (value: string) => {
    return isSelected(value)
      ? BACKGROUND_COLORS.SKY_BLUE
      : BACKGROUND_COLORS.ORANGE
  }

  const hanleDateSelection = (date: Date | undefined) => {
    dispatch(setDate({ fecha: date?.getTime() }))
  }

  const handleEtiquetasSelections = (name: string) => {
    dispatch(setEtiquetas({ name }))
  }

  return (
    <ScrollView
      horizontal
      style={tw`my-2 py-4 mx-4 flex flex-row overflow-hidden`}
    >
      <Gap px="1">
        <FiltroFecha
          setDate={hanleDateSelection}
          date={buildFiltros.fecha as number}
        />
      </Gap>

      {filtros.map((filtro) => {
        const { icon, value, nombre } = filtro
        const backgoundColor = getBackgroundColor(value)
        return (
          <Gap key={filtro.value} px="1">
            <Badge
              label={nombre}
              name={value}
              icon={icons ? icon : undefined}
              backgroundColor={backgoundColor}
              handleClick={handleEtiquetasSelections}
            />
            {isSelected(value) && <CancelButton />}
          </Gap>
        )
      })}
    </ScrollView>
  )
}

export default BarraFiltros
