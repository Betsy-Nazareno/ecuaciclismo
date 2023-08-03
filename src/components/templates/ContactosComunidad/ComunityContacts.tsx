import * as React from 'react'
import tw from 'twrnc'
import { RefreshControl, ScrollView, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import TarjetaComunityContact from './TarjetaComunityContact'
import ComunityContactsHeader from './ComunityContactsHeader'
import { getComunidad, getContactosSeguros } from '../../../lib/services/user.services'
import EmptyTarjetaContacto from '../../organismos/EmptyTarjetaContacto'
import WithoutResults from '../../moleculas/WithoutResults'
import { DatosContactoSeguro } from '../ContactosSeguros/SecureContacts'
import { DatosBasicosUser } from '../Comunidad/ComunidadAndRoles'

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

const ComunityContacts = () => {
  const { authToken, user } = useSelector((state: RootState) => state.user)
  const [isLoading, setIsLoading] = React.useState(true)
  const [refreshing, setRefreshing] = React.useState(false)
  const [noContactosSeguros, setNoContactosSeguros] = React.useState<DatosBasicosUser[]>([])
  const [filteredNoContactosSeguros, setFilteredNoContactosSeguros] = React.useState<DatosBasicosUser[]>([])
  const { text, buildFiltros } = useSelector((state: RootState) => state.busqueda)
  const { secureContactsHasModified } = useSelector((state: RootState) => state.contactosSeguros)

  React.useEffect(() => {
    (async () => {
      let comunidad : DatosBasicosUser[] = (await getComunidad(authToken || '')) || []
      let contactosSeguros: DatosContactoSeguro[] = (await getContactosSeguros(authToken || '')) || []
      let result : DatosBasicosUser[] = comunidad.filter((val) =>
        (!contactosSeguros.some((item) => item.usuario_id === val.usuario_id))
        && (val.token_usuario!==user?.id_usuario)
      )
      
      setNoContactosSeguros(result)
      setFilteredNoContactosSeguros(result)
      setIsLoading(false)
    })()
  }, [secureContactsHasModified])

  const onRefresh = async () => {
    setRefreshing(true)
    await getData()
    wait(3000).then(() => setRefreshing(false))
  }

  const getData = async () => {
    let comunidad : DatosBasicosUser[] = (await getComunidad(authToken || '')) || []
    let contactosSeguros: DatosContactoSeguro[] = (await getContactosSeguros(authToken || '')) || []
    let result : DatosBasicosUser[] = comunidad.filter((val) =>
      (!contactosSeguros.some((item) => item.usuario_id === val.usuario_id))
      && (val.token_usuario!==user?.id_usuario)
    )
    
    setNoContactosSeguros(result)
    setFilteredNoContactosSeguros(result)
    setRefreshing(false)
  }
  
React.useEffect(() => {
  const etiquetas: string[] = buildFiltros.etiquetas ?? []
  let result = []
  if (text) {
    result = noContactosSeguros?.filter(
      (user) =>
      user.first_name.toLowerCase().includes(text.toLowerCase()) ||
      user.last_name.toLowerCase().includes(text.toLowerCase())
    )
  } else {
    result = noContactosSeguros
  }
  if (etiquetas.length > 0) {
    result = result?.filter((user) =>
      etiquetas.includes(user.tipo??'') || (user.admin && etiquetas.includes('Administrador'))
    )
  }
  setFilteredNoContactosSeguros(result)
}, [text, buildFiltros])

  return (
    <ScrollView
      style={tw`px-2 py-4`}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      <ComunityContactsHeader />
      <View style={tw`my-4`}>
        {isLoading ? (
          <>
            <EmptyTarjetaContacto />
            <EmptyTarjetaContacto />
            <EmptyTarjetaContacto />
          </>
        ) : filteredNoContactosSeguros?.length <= 0 ? (
          <WithoutResults styles="pt-12" />
        ) : (
          filteredNoContactosSeguros.map((ciclista) => (
            <TarjetaComunityContact key={ciclista.token_usuario} usuario={ciclista} isUser={1}/>
          ))
        )}
      </View>
    </ScrollView>
  )
}

export default ComunityContacts