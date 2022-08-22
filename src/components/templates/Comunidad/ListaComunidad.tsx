import * as React from 'react'
import tw from 'twrnc'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { getComunidad } from '../../../lib/services/user.services'
import TarjetaUsuario from './TarjetaUsuario'

export interface DatosBasicosUser {
  admin: boolean
  first_name: string
  last_name: string
  foto?: string
  token_usuario: string
}

const ListaComunidad = () => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const [comunidad, setComunidad] = React.useState<DatosBasicosUser[]>()

  React.useEffect(() => {
    ;(async () => {
      if (authToken) {
        const comunidad = await getComunidad(authToken)
        setComunidad(comunidad)
      }
    })()
  }, [])

  return (
    <View style={tw`my-4`}>
      {comunidad?.map((ciclista) => (
        <TarjetaUsuario
          key={ciclista.token_usuario}
          usuario={ciclista}
          authToken={authToken || ''}
        />
      ))}
    </View>
  )
}

export default ListaComunidad
