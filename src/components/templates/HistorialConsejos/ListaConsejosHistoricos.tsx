import * as React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import tw from 'twrnc'
import { obtenerConsejosHistoricos } from '../../../lib/services/consejos.services'
import { Consejo } from '../../../models/Consejo.model'
import { RootState } from '../../../redux/store'
import TarjetaConsejoHistorico from './TarjetaConsejoHistorico'

interface ListConsejosHistoricosProps {
  text: string
}

const ListaConsejosHistoricos = ({ text }: ListConsejosHistoricosProps) => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const [consejos, setConsejos] = React.useState([])
  const [filteredConsejos, setFilterdConsejos] = React.useState([])

  React.useEffect(() => {
    let isMounted = true
    if (isMounted) {
      ;(async function () {
        const response = await obtenerConsejosHistoricos(authToken as string)
        setConsejos(response.data)
        setFilterdConsejos(response.data)
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
        setFilterdConsejos(consejos)
      } else {
        const filteredConsejos = consejos.filter((consejo: Consejo) =>
          consejo.informacion.toLowerCase().includes(text.toLowerCase())
        )
        setFilterdConsejos(filteredConsejos)
      }
    }
    return () => {
      isMounted = false
    }
  }, [text])

  return (
    <View style={tw`pt-4`}>
      {filteredConsejos?.map((consejo, index) => (
        <TarjetaConsejoHistorico key={index} consejo={consejo} />
      ))}
    </View>
  )
}

export default ListaConsejosHistoricos
