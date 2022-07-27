import * as React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import tw from 'twrnc'
import { obtenerPublicaciones } from '../../../lib/services/publicaciones.services'
import { Publicacion } from '../../../models/Publicaciones.model'
import { RootState } from '../../../redux/store'
import WithoutResults from '../../moleculas/WithoutResults'
import EmptyTarjetaPublicacion from '../../organismos/EmptyTarjetaPublicacion'
import PublicacionesFeedHeader from './PublicacionesFeedHeader'
import TarjetaPublicaciones from './TarjetaPublicaciones'

const PublicacionesFeed = () => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const [publicaciones, setPublicaciones] = React.useState<Publicacion[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const { publicacionHasModified } = useSelector(
    (state: RootState) => state.publicacion
  )
  const { text, buildFiltros } = useSelector(
    (state: RootState) => state.busqueda
  )
  const [filteredPublicaciones, setFilteredPublicaciones] = React.useState<
    Publicacion[]
  >([])

  React.useEffect(() => {
    ;(async () => {
      const publicaciones = (await obtenerPublicaciones(authToken || '')) || []
      setPublicaciones(publicaciones)
      setFilteredPublicaciones(publicaciones)
      setIsLoading(false)
    })()
  }, [publicacionHasModified])

  React.useEffect(() => {
    const { etiquetas = [], fecha } = buildFiltros
    let publicacionesFiltradas = []
    if (text) {
      publicacionesFiltradas = publicaciones?.filter(
        (publicacion) =>
          publicacion.titulo.toLowerCase().includes(text.toLowerCase()) ||
          publicacion.descripcion.toLowerCase().includes(text.toLowerCase())
      )
    } else {
      publicacionesFiltradas = publicaciones
    }
    if (etiquetas?.length > 0) {
      publicacionesFiltradas = publicacionesFiltradas?.filter((publicacion) =>
        publicacion.etiquetasResult?.some((etiqueta) =>
          etiquetas?.includes(etiqueta.value)
        )
      )
    }
    if (fecha) {
      const date = new Date(fecha)
      date.setHours(0, 0, 0, 0)
      publicacionesFiltradas = publicacionesFiltradas?.filter((publicacion) => {
        const fechaCreacion = new Date(publicacion.ultimo_cambio || '')
        fechaCreacion.setUTCHours(5)
        return date.getTime() === fechaCreacion.getTime()
      })
    }

    setFilteredPublicaciones(publicacionesFiltradas)
  }, [text, buildFiltros])

  return (
    <View style={tw`px-2`}>
      <PublicacionesFeedHeader />
      <View style={tw`py-2`}>
        {isLoading ? (
          <>
            <EmptyTarjetaPublicacion />
            <EmptyTarjetaPublicacion />
            <EmptyTarjetaPublicacion />
          </>
        ) : filteredPublicaciones?.length <= 0 ? (
          <WithoutResults />
        ) : (
          filteredPublicaciones.map((publicacion) => (
            <TarjetaPublicaciones
              publicacion={publicacion}
              key={publicacion.token}
            />
          ))
        )}
      </View>
    </View>
  )
}

export default PublicacionesFeed
