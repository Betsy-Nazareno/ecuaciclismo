import * as React from 'react'
import tw from 'twrnc'
import { RefreshControl, ScrollView, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import TarjetaContacto from './TarjetaContacto'
import ContactosHeader from './ContactosHeader'
import { getContactosSeguros } from '../../../lib/services/user.services'
import EmptyTarjetaContacto from '../../organismos/EmptyTarjetaContacto'
import WithoutResults from '../../moleculas/WithoutResults'

export interface DatosContactoSeguro {
  id: number
  nombre: string
  celular?: string
  token: string
  foto?: string
  tipo?: string
  isUser: number
  admin: boolean
  usuario_id: number
  isPropietary: number
}

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

const SecureContacts = () => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const [contactosSeguros, setContactosSeguros] = React.useState<DatosContactoSeguro[]>([])
  const [filtredContactosSeguros, setFiltredContactosSeguros] = React.useState<DatosContactoSeguro[]>([])
  const [refreshing, setRefreshing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const { secureContactsHasModified } = useSelector((state: RootState) => state.contactosSeguros)

  React.useEffect(() => {
    (async () => {
      await getData()
      setIsLoading(false)
    })()
  }, [secureContactsHasModified])
  
  const onRefresh = async () => {
    setRefreshing(true)
    await getData()
    wait(3000).then(() => setRefreshing(false))
  }

  const getData = async () => {
    const res: DatosContactoSeguro[] = (await getContactosSeguros(authToken || '')) || []    
    setContactosSeguros(res)
    setFiltredContactosSeguros(res)
    setRefreshing(false)
  }

  const text = useSelector((state: RootState) => state.busqueda.text)

  React.useEffect(() => {
    if (text) {
      setFiltredContactosSeguros(contactosSeguros?.filter(
        (contactoSeguro) =>
          contactoSeguro.nombre.toLowerCase().includes(text.toLowerCase())
      ))
    }else{
      setFiltredContactosSeguros(contactosSeguros)
    }
  }, [text])

  return (
    <ScrollView
      style={tw`px-2 py-4`}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      <ContactosHeader />
      <View style={tw`my-4`}>
        {isLoading ? (
          <>
            <EmptyTarjetaContacto />
            <EmptyTarjetaContacto />
            <EmptyTarjetaContacto />
          </>
          ) : filtredContactosSeguros?.length <= 0 ? (
            <WithoutResults styles="pt-12" />
          ) : (
            filtredContactosSeguros.map((ciclista) => (
              <TarjetaContacto key={ciclista.token} usuario={ciclista}/>
            ))
        )}
      </View>
    </ScrollView>
  )
}

export default SecureContacts