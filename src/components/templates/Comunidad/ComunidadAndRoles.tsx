import * as React from 'react'
import tw from 'twrnc'
import { RefreshControl, ScrollView, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import TarjetaUsuario from './TarjetaUsuario'
import { getComunidad } from '../../../lib/services/user.services'
import ComunidadHeader from './ComunidadHeader'
import WithoutResults from '../../moleculas/WithoutResults'
import EmptyTarjetaContacto from '../../organismos/EmptyTarjetaContacto'

export interface DatosBasicosUser {
  usuario_id:number
  admin: boolean
  first_name: string
  last_name: string
  foto?: string
  tipo?:string
  isPropietary:number
  token_usuario: string
}

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

const ComunidadAndRoles = () => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const [comunidad, setComunidad] = React.useState<DatosBasicosUser[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [refreshing, setRefreshing] = React.useState(false)
  const { text, buildFiltros } = useSelector((state: RootState) => state.busqueda)
  const [filteredUsers, setFilteredUsers] = React.useState<DatosBasicosUser[]>([])

  React.useEffect(() => {
    (async () => {
      const comunity = (await getComunidad(authToken || '')) || []
      setComunidad(comunity)
      setFilteredUsers(comunity)
      setIsLoading(false)
    })()
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    await getData()
    wait(3000).then(() => setRefreshing(false))
  }

  const getData = async () => {
    if (authToken) {
      setComunidad(await getComunidad(authToken))
      setFilteredUsers(comunidad)
    }
    setRefreshing(false)
  }

  const compareAdmin = (etiqueta: string[], user: DatosBasicosUser) => {
    if(user.admin && etiqueta.includes('Administrador')){
      return true
    }
    return false
  }
  
  React.useEffect(() => {
    const etiquetas: string[] = buildFiltros.etiquetas ?? []
    let result = []
    if (text) {
      result = comunidad?.filter(
        (user) =>
        user.first_name.toLowerCase().includes(text.toLowerCase()) ||
        user.last_name.toLowerCase().includes(text.toLowerCase())
      )
    } else {
      result = comunidad
    }
    if (etiquetas.length > 0) {
      result = result?.filter((user) =>
        etiquetas.includes(user.tipo??'') || compareAdmin(etiquetas, user)
      )
    }
    setFilteredUsers(result)
  }, [text, buildFiltros])

  return (
    <ScrollView
      style={tw`px-2 py-4`}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      <ComunidadHeader />
      <View style={tw`my-4`}>
      {isLoading ? (
          <>
            <EmptyTarjetaContacto />
            <EmptyTarjetaContacto />
            <EmptyTarjetaContacto />
          </>
        ) : filteredUsers?.length <= 0 ? (
          <WithoutResults styles="pt-12" />
        ) : (
          filteredUsers?.map((ciclista) => (
            <TarjetaUsuario key={ciclista.token_usuario} usuario={ciclista} />
          ))
        )}
      </View>
    </ScrollView>
  )
}

export default ComunidadAndRoles
