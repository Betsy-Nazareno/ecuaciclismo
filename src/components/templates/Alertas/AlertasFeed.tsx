import * as React from 'react'
import tw from 'twrnc'
import { View } from 'react-native'
import AlertasFeedHeader from './AlertasFeedHeader'
import TarjetaAlertas from './TarjetaAlertas'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { obtenerAlertasRecibidas, obtenerAlertasEnviadas } from '../../../lib/services/alertas.services'
import { Alerta } from '../../../models/Alertas'
import { setAlertasEnviadas, setAlertasFeed, setAllAlertas } from '../../../redux/alerta'
import EmptyTarjetaPublicacion from '../../organismos/EmptyTarjetaPublicacion'
import WithoutResults from '../../moleculas/WithoutResults'


const AlertasFeed = () => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const { alertasFeed } = useSelector((state: RootState) => state.alerta)
  const { alertasEnviadas } = useSelector((state: RootState) => state.alerta)
  const [isRending, setIsRending] = React.useState(true)
  const dispatch = useDispatch()
  const { alertaHasModified } = useSelector((state: RootState) => state.alerta)
  const { text, buildFiltros } = useSelector(
    (state: RootState) => state.busqueda
  )
  console.log(alertaHasModified)
  const [filteredAlertas, setFilteredAlertas] = React.useState<Alerta[]>([])
  React.useEffect(() => {
    ; (async function () {
      if (authToken) {
        console.log('Yo escucho')
        const response: Alerta[] = await obtenerAlertasRecibidas(authToken)
        const alertasEnviadas: Alerta[] = await obtenerAlertasEnviadas(authToken)
        dispatch(setAlertasFeed({ alertasFeed: response }))
        dispatch(setAllAlertas({ allAlertas: [...response, ...alertasEnviadas] }))
        dispatch(setAlertasEnviadas({ alertasEnviadas }))
        setFilteredAlertas(response)
        setIsRending(false)
      }
    })()
  }, [alertaHasModified])

  React.useEffect(() => {
    const { etiquetas = [], fecha } = buildFiltros
    let alertasFiltradas = []
    if (text && etiquetas?.length > 0) {
      // Filtrar por texto y etiquetas seleccionadas a la vez
      alertasFiltradas = alertasEnviadas?.filter(
        (alerta) =>
        (alerta.first_name.toLowerCase().includes(text.toLowerCase()) ||
          alerta.last_name.toLowerCase().includes(text.toLowerCase()) ||
          alerta.descripcion.toLowerCase().includes(text.toLowerCase()))
      );
    } else if (text) {
      // Filtrar solo por texto
      alertasFiltradas = alertasFeed?.filter(
        (alerta) =>
          alerta.first_name.toLowerCase().includes(text.toLowerCase()) ||
          alerta.last_name.toLowerCase().includes(text.toLowerCase()) ||
          alerta.descripcion.toLowerCase().includes(text.toLowerCase())
      );
    } else if (etiquetas?.length > 0) {
      alertasFiltradas = alertasEnviadas
    } else {
      // Si no hay texto ni etiquetas seleccionadas, mostrar todas las alertas
      alertasFiltradas = alertasFeed;
    }
    if (fecha) {
      const date = new Date(fecha)
      date.setHours(0, 0, 0, 0)
      alertasFiltradas = alertasFiltradas?.filter((alerta) => {
        const fechaCreacion = new Date(alerta.fecha_creacion || '')
        fechaCreacion.setUTCHours(5)
        return date.getFullYear() === fechaCreacion.getFullYear() &&
          date.getMonth() === fechaCreacion.getMonth() &&
          date.getDate() === fechaCreacion.getDate()
      })
    }
    setFilteredAlertas(alertasFiltradas)
  }, [text, buildFiltros])
  filteredAlertas
    ?.slice()
    ?.sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion))
  return (
    <View style={tw`px-2`}>
      <AlertasFeedHeader />
      <View accessibilityLabel='listCardAlerts' style={tw`py-2`}>
        {isRending ? (
          <>
            <EmptyTarjetaPublicacion />
            <EmptyTarjetaPublicacion />
            <EmptyTarjetaPublicacion />
          </>
        ) : filteredAlertas && filteredAlertas.length <= 0 ? (
          <WithoutResults styles="pt-12" />
        )
          : (
            filteredAlertas?.map((alerta, index) => {
              return <TarjetaAlertas key={index} alerta={alerta} />
            })
          )}
      </View>
    </View>
  )
}

export default AlertasFeed
