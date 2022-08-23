import * as React from 'react'
import tw from 'twrnc'
import { RefreshControl, ScrollView, View } from 'react-native'
import SectionTitle from '../../moleculas/SectionTitle'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import TarjetaUsuario from './TarjetaUsuario'
import { getComunidad } from '../../../lib/services/user.services'

export interface DatosBasicosUser {
  admin: boolean
  first_name: string
  last_name: string
  foto?: string
  token_usuario: string
}

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

const ComunidadAndRoles = () => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const [comunidad, setComunidad] = React.useState<DatosBasicosUser[]>()
  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await getData()
    wait(2000).then(() => setRefreshing(false))
  }

  const getData = async () => {
    if (authToken) {
      setComunidad(await getComunidad(authToken))
    }
    setRefreshing(false)
  }

  React.useEffect(() => {
    ;(async () => {
      await getData()
    })()
  }, [])

  return (
    <ScrollView
      style={tw`px-2 py-4`}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      <SectionTitle text="Comunidad" />
      <View style={tw`my-4`}>
        {comunidad?.map((ciclista) => (
          <TarjetaUsuario
            key={ciclista.token_usuario}
            usuario={ciclista}
            authToken={authToken || ''}
          />
        ))}
      </View>
    </ScrollView>
  )
}

export default ComunidadAndRoles
