import * as React from 'react'
import tw from 'twrnc'
import { ScrollView, Text } from 'react-native'
import Gap from '../atomos/Gap'
import FiltroFecha from '../atomos/FiltroFecha'
import AdminValidator from '../templates/AdminValidator'
import Badge from '../moleculas/Badge'
import { BACKGROUND_COLORS } from '../../utils/constants'
import CancelButton from '../atomos/CancelButton'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { setDate, setEtiquetas } from '../../redux/rutasBusqueda'
import { setRutasFeed } from '../../redux/ruta'

const BarraFiltrosRutas = () => {
  const dispatch = useDispatch()
  const { rutasPropuestas, allRutas, rutasFeed } = useSelector(
    (state: RootState) => state.ruta
  )

  const { buildFiltros } = useSelector(
    (state: RootState) => state.busquedaRutas
  )

  const isSelected = (value: string) => {
    return buildFiltros.etiqueta === value
  }

  const getBackgroundColor = (value: string) => {
    return isSelected(value)
      ? BACKGROUND_COLORS.SKY_BLUE
      : BACKGROUND_COLORS.ORANGE
  }

  const handleRutasPropuestas = () => {
    if (!isSelected('propuestas')) {
      dispatch(setRutasFeed({ rutasFeed: rutasPropuestas }))
    } else {
      dispatch(setRutasFeed({ rutasFeed: allRutas }))
    }
    dispatch(setEtiquetas({ name: 'propuestas' }))
  }

  const handleRutasInscritas = () => {
    if (!isSelected('inscritas')) {
      dispatch(
        setRutasFeed({ rutasFeed: allRutas?.filter((ruta) => ruta.inscrito) })
      )
    } else {
      dispatch(setRutasFeed({ rutasFeed: allRutas }))
    }
    dispatch(setEtiquetas({ name: 'inscritas' }))
  }

  const handleRutasDisponibles = () => {
    if (!isSelected('disponibles')) {
      dispatch(
        setRutasFeed({
          rutasFeed: allRutas?.filter(
            (ruta) => ruta.estado?.estado_no_iniciada
          ),
        })
      )
    } else {
      dispatch(setRutasFeed({ rutasFeed: allRutas }))
    }
    dispatch(setEtiquetas({ name: 'disponibles' }))
  }

  const handleRutasFinalizadas = () => {
    if (!isSelected('finalizadas')) {
      dispatch(
        setRutasFeed({
          rutasFeed: allRutas?.filter((ruta) => ruta.estado?.estado_finalizado),
        })
      )
    } else {
      dispatch(setRutasFeed({ rutasFeed: allRutas }))
    }
    dispatch(setEtiquetas({ name: 'finalizadas' }))
  }

  const handleRutaSinCupo = () => {
    if (!isSelected('sin_cupo')) {
      dispatch(
        setRutasFeed({
          rutasFeed: allRutas?.filter((ruta) => ruta.estado?.estado_sin_cupos),
        })
      )
    } else {
      dispatch(setRutasFeed({ rutasFeed: allRutas }))
    }
    dispatch(setEtiquetas({ name: 'sin_cupo' }))
  }

  const hanleDateSelection = (date: Date | undefined) => {
    if (!date) {
      dispatch(setDate({ fecha: undefined }))
      dispatch(setRutasFeed({ rutasFeed: allRutas }))
      return
    }
    dispatch(setDate({ fecha: date?.getTime() }))
    const fecha = new Date(date)
    fecha.setHours(0, 0, 0, 0)
    const filteredRutas = rutasFeed?.filter((ruta) => {
      const [fechac] = (ruta.fecha_inicio as any)?.split(' ')
      const fechaCreacion = new Date(fechac)
      fechaCreacion.setUTCHours(5)
      return fecha.getTime() === fechaCreacion.getTime()
    })
    dispatch(setRutasFeed({ rutasFeed: filteredRutas }))
  }

  return (
    <ScrollView
      horizontal
      style={tw`my-2 py-4 mx-4 flex flex-row overflow-hidden`}
    >
      <Gap px="1" py="1">
        <FiltroFecha setDate={hanleDateSelection} date={buildFiltros.fecha} />
      </Gap>
      <AdminValidator>
        <Gap px="1" py="1" styles="relative">
          <Badge
            label={'Propuestas'}
            name={'propuestas'}
            backgroundColor={getBackgroundColor('propuestas')}
            handleClick={handleRutasPropuestas}
          />
          {rutasPropuestas?.length ? (
            <Text
              style={tw`absolute top-0 right-0 bg-red-800 rounded-full text-white font-bold px-1 text-xs`}
            >
              {rutasPropuestas?.length}
            </Text>
          ) : null}
        </Gap>
      </AdminValidator>
      <Gap px="1" py="1">
        <Badge
          label={'Inscritas'}
          name={'inscritas'}
          backgroundColor={getBackgroundColor('inscritas')}
          handleClick={handleRutasInscritas}
        />
        {isSelected('inscritas') && <CancelButton />}
      </Gap>

      <Gap px="1" py="1">
        <Badge
          label={'Disponibles'}
          name={'disponibles'}
          backgroundColor={getBackgroundColor('disponibles')}
          handleClick={handleRutasDisponibles}
        />
        {isSelected('disponibles') && <CancelButton />}
      </Gap>

      <Gap px="1" py="1">
        <Badge
          label={'Finalizadas'}
          name={'finalizadas'}
          backgroundColor={getBackgroundColor('finalizadas')}
          handleClick={handleRutasFinalizadas}
        />
        {isSelected('finalizadas') && <CancelButton />}
      </Gap>

      <Gap px="1" py="1">
        <Badge
          label={'Sin Cupo'}
          name={'sin_cupo'}
          backgroundColor={getBackgroundColor('sin_cupo')}
          handleClick={handleRutaSinCupo}
        />
        {isSelected('sin_cupo') && <CancelButton />}
      </Gap>
      {/* {filtros.map((filtro) => {
        const { value, nombre } = filtro
        const backgoundColor = getBackgroundColor(value)
        return (
          <Gap key={filtro.value} px="1" py="1">
            <Badge
              label={nombre}
              name={value}
              backgroundColor={backgoundColor}
              handleClick={handleEtiquetasSelections}
            />
            {isSelected(value) && <CancelButton />}
          </Gap>
        )
      })} */}
    </ScrollView>
  )
}

export default BarraFiltrosRutas
