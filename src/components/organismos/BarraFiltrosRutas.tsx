import * as React from 'react'
import tw from 'twrnc'
import { ScrollView } from 'react-native'
import Gap from '../atomos/Gap'
import FiltroFecha from '../atomos/FiltroFecha'
import AdminValidator from '../templates/AdminValidator'
import Badge from '../moleculas/Badge'
import { BACKGROUND_COLORS } from '../../utils/constants'
import { Filtro } from '../../models/Publicaciones.model'
import CancelButton from '../atomos/CancelButton'
import UserValidator from '../templates/UserValidator'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { setEtiquetas } from '../../redux/rutasBusqueda'

interface BarraFiltrosRutasProps {
  filtros: Filtro[]
}

const BarraFiltrosRutas = ({ filtros }: BarraFiltrosRutasProps) => {
  const dispatch = useDispatch()

  const { buildFiltros } = useSelector(
    (state: RootState) => state.busquedaRutas
  )

  const isSelected = (value: string) => {
    return buildFiltros.etiquetas?.includes(value)
  }

  const handleEtiquetasSelections = (name: string) => {
    dispatch(setEtiquetas({ name }))
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
        <FiltroFecha
          setDate={() => {
            return
          }}
          date={undefined}
        />
      </Gap>
      <AdminValidator>
        <Gap px="1">
          <Badge
            label={'Propuestas'}
            name={'propuestas'}
            backgroundColor={BACKGROUND_COLORS.ORANGE}
            handleClick={() => {
              return
            }}
          />
        </Gap>
      </AdminValidator>
      <UserValidator>
        <Gap px="1">
          <Badge
            label={'Inscritas'}
            name={'inscritas'}
            backgroundColor={BACKGROUND_COLORS.ORANGE}
            handleClick={() => {
              return
            }}
          />
        </Gap>
      </UserValidator>
      {filtros.map((filtro) => {
        const { value, nombre } = filtro
        const backgoundColor = getBackgroundColor(value)
        return (
          <Gap key={filtro.value} px="1">
            <Badge
              label={nombre}
              name={value}
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

export default BarraFiltrosRutas
