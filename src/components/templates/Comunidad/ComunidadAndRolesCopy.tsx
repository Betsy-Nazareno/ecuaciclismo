import * as React from 'react'
import tw from 'twrnc'
import { RefreshControl, ScrollView, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import TarjetaUsuario from './TarjetaUsuario'
import { getComunidad } from '../../../lib/services/user.services'
import ComunidadHeader from './ComunidadHeader'
import { string } from 'yup'

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
  const [refreshing, setRefreshing] = React.useState(false)
  const { text, buildFiltros } = useSelector((state: RootState) => state.busqueda)
  const [FilteredUsers, setFilteredUsers] = React.useState<DatosBasicosUser[]>([])

  const onRefresh = async () => {
    setRefreshing(true)
    await getData()
    wait(100000).then(() => setRefreshing(false))
  }

  const getData = async () => {
    if (authToken) {
      setComunidad(await getComunidad(authToken))
      setFilteredUsers(comunidad)
    }
    setRefreshing(false)
  }

  React.useEffect(() => {
    ;(async () => {
      await getData()
    })()
  }, [])

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
      result = result?.filter((user) =>{
        if(user.admin){
          etiquetas.includes('Administrador')
        }else{
          let etiqueta:string=user.tipo??''
          etiquetas.includes(etiqueta)
        }
      })
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
        {FilteredUsers?.map((ciclista) => (
          <TarjetaUsuario key={ciclista.token_usuario} usuario={ciclista} />
        ))}
      </View>
    </ScrollView>
  )
}

export default ComunidadAndRoles
