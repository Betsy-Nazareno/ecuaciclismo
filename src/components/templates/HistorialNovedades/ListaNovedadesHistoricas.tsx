import * as React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import tw from 'twrnc'
import { obtenerNovedades } from '../../../lib/services/novedades.services'
import { NovedadInterface } from '../../../models/Novedad.model'
import { RootState } from '../../../redux/store'
import TarjetaNovedadHistorica from './TarjetaNovedadHistorica'

interface ListaNovedadesHistoricasProps {
  text: string
}

const ListaNovedadesHistoricas = ({ text }: ListaNovedadesHistoricasProps) => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const [novedades, setNovedades] = React.useState<NovedadInterface[]>([])
  const [filteredNovedades, setFilteredNovedades] = React.useState<
    NovedadInterface[]
  >([])
  const { novedadHasModified } = useSelector(
    (state: RootState) => state.novedad
  )

  React.useEffect(() => {
    {
      ;(async function () {
        const response = await obtenerNovedades(authToken || '')
        const novedades: NovedadInterface[] = response.data
        setNovedades(novedades)
        setFilteredNovedades(novedades)
      })()
    }
    
  }, [novedadHasModified])

  React.useEffect(() => {
    
    {
      if (!text) {
        setFilteredNovedades(novedades)
      } else {
        setFilteredNovedades(filtrarNovedades())
      }
    }
    
  }, [text])

  const filtrarNovedades = (): NovedadInterface[] => {
    const standarText = text.toLowerCase()
    return novedades.filter(
      (novedad: NovedadInterface) =>
        novedad.descripcion.toLowerCase().includes(standarText) ||
        novedad.descripcion_corta.toLowerCase().includes(standarText) ||
        novedad.titulo.toLowerCase().includes(standarText) ||
        novedad.nombre?.toLowerCase().includes(standarText)
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
