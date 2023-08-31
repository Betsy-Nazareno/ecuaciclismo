import * as React from 'react'
import tw from 'twrnc'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import EmptyTarjetaPublicacion from '../../organismos/EmptyTarjetaPublicacion'
import WithoutResults from '../../moleculas/WithoutResults'
import { Solicitud } from '../../../models/Solicitud'
import { getSolicitudes} from '../../../lib/services/solicitud.services'
import { setSolicitudesFeed } from '../../../redux/solicitud'

import TarjetaSolicitud from './TarjetaSolicitud'
import SolicitudesHeader from './SolicitudesHeader'


const SolicitudesFeed = () => {
  const { authToken, user } = useSelector((state: RootState) => state.user)
  const { solicitudesFeed } = useSelector((state: RootState) => state.solicitud)
  
  const [isRending, setIsRending] = React.useState(true)
  const dispatch = useDispatch()
  const { solicitudHasModified } = useSelector((state: RootState) => state.solicitud)
  const { text, buildFiltros } = useSelector(
    (state: RootState) => state.busqueda
  )
  const [filteredSolicitud, setFilteredSolicitudes] = React.useState<Solicitud[]>([])

  React.useEffect(() => {
    ;(async function () {
      if (authToken && user?.admin) {
        const response: Solicitud[] = await getSolicitudes(authToken)
        dispatch(setSolicitudesFeed({ solicitudesFeed: response }))
        setFilteredSolicitudes(response)
        setIsRending(false)
      }
      else if (authToken ){
        const response: Solicitud[] = await getSolicitudes(authToken)
        const solicitudesEnviadas=response.filter((solicitud)=>solicitud.token_usuario===authToken)
        dispatch(setSolicitudesFeed({ solicitudesFeed: solicitudesEnviadas }))
        setFilteredSolicitudes(solicitudesEnviadas)
        setIsRending(false)
      }
    })()
  }, [solicitudHasModified])

  React.useEffect(() => {
    const { etiquetas = [], fecha } = buildFiltros
    let solicitudesFiltradas = []
    if (text && etiquetas?.length > 0) {
      // Filtrar por texto y etiquetas seleccionadas a la vez
      solicitudesFiltradas = solicitudesFeed?.filter(
        (solicitud) =>
          (solicitud.nombre?.toLocaleLowerCase().includes(text.toLowerCase()) ||
          solicitud.first_name?.toLowerCase().includes(text.toLowerCase()) ||
          solicitud.last_name?.toLowerCase().includes(text.toLowerCase()) ||
          solicitud.descripcion?.toLowerCase().includes(text.toLowerCase())) 
      );
    } else if (text) {
      // Filtrar solo por texto
      solicitudesFiltradas = solicitudesFeed?.filter(
        (solicitud) =>
          (solicitud.nombre?.toLocaleLowerCase().includes(text.toLowerCase()) ||
          solicitud.first_name?.toLowerCase().includes(text.toLowerCase()) ||
          solicitud.last_name?.toLowerCase().includes(text.toLowerCase()) ||
          solicitud.descripcion?.toLowerCase().includes(text.toLowerCase())) 
      );
    }else if (etiquetas?.length > 0) {
      solicitudesFiltradas=solicitudesFeed?.filter((solicitud) => {
        const etiquetasSolicitud = Array.isArray(solicitud.tipo) ? solicitud.tipo : [solicitud.tipo];
        return etiquetasSolicitud?.some((etiqueta) => etiquetas?.includes(etiqueta));
        }
        )
    }else {
      // Si no hay texto ni etiquetas seleccionadas, mostrar todas las alertas
      solicitudesFiltradas = solicitudesFeed;
    }
    if (fecha) {
      const date = new Date(fecha)
      date.setHours(0, 0, 0, 0)
      solicitudesFiltradas = solicitudesFiltradas?.filter((alerta) => {
        const fechaCreacion = new Date(alerta.fecha_creacion || '')
        fechaCreacion.setUTCHours(5)
        return date.getFullYear() === fechaCreacion.getFullYear() &&
        date.getMonth() === fechaCreacion.getMonth() &&
        date.getDate() === fechaCreacion.getDate()
      })
    }
    setFilteredSolicitudes(solicitudesFiltradas)
  }, [text, buildFiltros])
  // filteredSolicitud
  // ?.slice()
  // ?.sort((a, b) => new Date(b.fecha_creacion)- new Date(a.fecha_creacion))
  return (
    <View style={tw`px-2`}>
      <SolicitudesHeader/>
      <View style={tw`py-2`}>
        {isRending ? (
            <>
              <EmptyTarjetaPublicacion />
              <EmptyTarjetaPublicacion />
              <EmptyTarjetaPublicacion />
            </>
          ) :filteredSolicitud && filteredSolicitud.length<=0? (
            <WithoutResults styles="pt-12" />
          )
          : (
            filteredSolicitud?.map((solicitud, index) => {
              return <TarjetaSolicitud key={index} solicitud={solicitud} />
            })
          )}
      </View>
    </View>
  )
}

export default SolicitudesFeed