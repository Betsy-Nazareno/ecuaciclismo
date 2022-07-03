import * as React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import tw from 'twrnc'
import { obtenerConsejos } from '../../../lib/services/consejos.services'
import { Consejo } from '../../../models/Consejo.model'
import { RootState } from '../../../redux/store'
import TarjetaConsejoHistorico from '../atomos/TarjetaConsejoHistorico'

interface ListConsejosHistoricosProps {
  text: string
}

const ListConsejosHistoricos = ({ text }: ListConsejosHistoricosProps) => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const [consejos, setConsejos] = React.useState([])
  const [filteredConsejos, setFilterdConsejos] = React.useState([])

  React.useEffect(() => {
    ;(async function () {
      const response = await obtenerConsejos(authToken as string)
      setConsejos(response.data)
      setFilterdConsejos(response.data)
    })()
  }, [])

  React.useEffect(() => {
    if (!text) {
      setFilterdConsejos(consejos)
    } else {
      const filteredConsejos = consejos.filter((consejo: Consejo) =>
        consejo.informacion.toLowerCase().includes(text.toLowerCase())
      )
      setFilterdConsejos(filteredConsejos)
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

export default ListConsejosHistoricos
