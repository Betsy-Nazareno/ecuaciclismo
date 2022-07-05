import * as React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import tw from 'twrnc'
import { obtenerNovedades } from '../../../lib/services/novedades.services'
import { PublicidadInterface } from '../../../models/Publicidad.model'
import { RootState } from '../../../redux/store'
import TarjetaNovedadHistorica from '../atomos/TarjetaNovedadHistorica'

interface ListaNovedadesHistoricasProps {
  text: string
}

const ListaNovedadesHistoricas = ({ text }: ListaNovedadesHistoricasProps) => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const [novedades, setNovedades] = React.useState<PublicidadInterface[]>([])
  const [filteredNovedades, setFilteredNovedades] = React.useState<
    PublicidadInterface[]
  >([])

  React.useEffect(() => {
    let isMounted = true
    if (isMounted) {
      ;(async function () {
        const response = await obtenerNovedades(authToken || '')
        const novedades: PublicidadInterface[] = response.data
        setNovedades(novedades)
        setFilteredNovedades(novedades)
      })()
    }
    return () => {
      isMounted = false
    }
  }, [])

  React.useEffect(() => {
    let isMounted = true
    if (isMounted) {
      if (!text) {
        setFilteredNovedades(novedades)
      } else {
        setFilteredNovedades(filtrarNovedades())
      }
    }
    return () => {
      isMounted = false
    }
  }, [text])

  const filtrarNovedades = (): PublicidadInterface[] => {
    const standarText = text.toLowerCase()
    return novedades.filter(
      (novedad: PublicidadInterface) =>
        novedad.descripcion.toLowerCase().includes(standarText) ||
        novedad.descripcion_corta.toLowerCase().includes(standarText) ||
        novedad.titulo.toLowerCase().includes(standarText) ||
        novedad.datos_contacto?.nombre.toLowerCase().includes(standarText)
    )
  }

  return (
    <View style={tw`pt-4`}>
      {filteredNovedades?.map((novedad, index) => (
        <TarjetaNovedadHistorica key={index} novedad={novedad} />
      ))}
    </View>
  )
}

export default ListaNovedadesHistoricas
