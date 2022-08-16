import * as React from 'react'
import tw from 'twrnc'
import { View } from 'react-native'
import RutasFeedHeader from './RutasFeedHeader'
import TarjetaRutas from './TarjetaRutas'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { getAllRutas } from '../../../lib/services/rutas.services'
import { Ruta } from '../../../models/Rutas'
import {
  setAllRutas,
  setRutasFeed,
  setRutasPropuestas,
} from '../../../redux/ruta'

const RutasFeed = () => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const { rutasFeed } = useSelector((state: RootState) => state.ruta)
  const dispatch = useDispatch()
  const { rutaHasModified } = useSelector((state: RootState) => state.ruta)

  React.useEffect(() => {
    ;(async function () {
      if (authToken) {
        const response: Ruta[] = await getAllRutas(authToken)
        const rutasPropuestas = response.filter((ruta) => !ruta.aprobado)
        const rutaspublicadas = response.filter((ruta) => ruta.aprobado)
        dispatch(setRutasFeed({ rutasFeed: rutaspublicadas }))
        dispatch(setRutasPropuestas({ rutasPropuestas }))
        dispatch(setAllRutas({ allRutas: rutaspublicadas }))
      }
    })()
  }, [rutaHasModified])

  const rutas = rutasFeed
    ?.slice()
    ?.sort((a, b) => (a.estado?.prioridad || 0) - (b.estado?.prioridad || 0))

  return (
    <View style={tw`px-2`}>
      <RutasFeedHeader />
      <View style={tw`py-2`}>
        {rutas?.map((ruta, index) => (
          <TarjetaRutas ruta={ruta} key={index} />
        ))}
      </View>
    </View>
  )
}

export default RutasFeed
