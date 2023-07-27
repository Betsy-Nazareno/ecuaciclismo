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
  const { authToken } = useSelector((state: RootState) => state.user)
  const [comunidad, setComunidad] = React.useState<DatosBasicosUser[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [refreshing, setRefreshing] = React.useState(false)
  const [contactosSeguros, setContactosSeguros] = React.useState<DatosContactoSeguro[]>([])
  const [noContactosSeguros, setNoContactosSeguros] = React.useState<DatosBasicosUser[]>([])

  const onRefresh = async () => {
    setRefreshing(true)
    await getData()
    wait(2000).then(() => setRefreshing(false))
  }

  const getData = async () => {
    if (authToken) {
      setComunidad(await getComunidad(authToken))
      setContactosSeguros(await getContactosSeguros(authToken))
    }
    
    let result: DatosBasicosUser[] = comunidad
    contactosSeguros.forEach((item: DatosContactoSeguro)=>{
      result=result.filter((val)=>val.token_usuario !== item.token)
    })
    result=result.filter((val)=>val.token_usuario !== authToken)
    setNoContactosSeguros(result)

    setRefreshing(false)
    setIsLoading(false)
  }

  React.useEffect(() => {
    ;(async () => await getData())()
  }, [])

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
        ) : noContactosSeguros?.length <= 0 ? (
          <WithoutResults styles="pt-12" />
        ) : (
          noContactosSeguros.map((ciclista) => (
            <TarjetaComunityContact key={ciclista.token_usuario} usuario={ciclista} isUser={1} setAction={onRefresh}/>
          ))
        )}
      </View>
    </ScrollView>
  )
}

export default ComunityContacts