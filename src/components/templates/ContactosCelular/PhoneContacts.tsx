import * as React from 'react'
import * as Contacts from 'expo-contacts'
import tw from 'twrnc'
import { RefreshControl, ScrollView, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import TarjetaContacto from './TarjetaPhoneContact'
import ContactosHeader from './ContactosCelularHeader'
import EmptyTarjetaContacto from '../../organismos/EmptyTarjetaContacto'
import WithoutResults from '../../moleculas/WithoutResults'
import { DatosContactoSeguro } from '../ContactosSeguros/SecureContacts'
import { getContactosSeguros } from '../../../lib/services/user.services'

export interface DatosPhoneContact {
  nombre: string
  celular: string
}

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

const PhoneContacts = () => {
  const { authToken, user } = useSelector((state: RootState) => state.user)
  const [contactos, setContactos] = React.useState<DatosPhoneContact[]>([])
  const [refreshing, setRefreshing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [hasPermission, setHasPermission] = React.useState(false);
  const [contactosSeguros, setContactosSeguros] = React.useState<DatosContactoSeguro[]>([])

  const onRefresh = async () => {
    setRefreshing(true)
    await getData()
    wait(2000).then(() => setRefreshing(false))
  }

  const getData = async () => {
    if (authToken) {
      setContactosSeguros(await getContactosSeguros(authToken))
    }

    let result: DatosPhoneContact[] = []
    if (hasPermission) {
      const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
    })
    data.forEach((contacto)=>{
      contacto.phoneNumbers?.forEach((phoneNumber)=>{
        let n: string = phoneNumber.number ?? ''
        n = n.replace(/ /gm, '').replace(/-/gm,'')
        if(!result.some((item) => item.celular === n) && !contactosSeguros.some((val) => val.celular===n)){
          result.push({nombre: contacto.name ?? '', celular: n})
        }
      })
    })
    setContactos(result)
    setRefreshing(false)
    setIsLoading(false)
    }
  }

  React.useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync()
      setHasPermission(status === 'granted')
      //getData()
      onRefresh()
    })();
  }, []);

  const text = useSelector((state: RootState) => state.busqueda.text)

/*  React.useEffect(() => {
    if (text.length>0) {
      setContactosSeguros(contactosSeguros?.filter(
        (contactoSeguro) =>
          contactoSeguro.nombre.toLowerCase().includes(text.toLowerCase())
      ))
    }else{onRefresh()}
  }, [text])

  React.useEffect(() => {
    ;(async () => {
      setIsLoading(false)
      await getData()
    })()
  }, [])
*/
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
          ) : contactos?.length <= 0 ? (
            <WithoutResults styles="pt-12" />
          ) : (
            contactos.map((contacto) => (
              <TarjetaContacto usuario={contacto} isUser={0} setAction={onRefresh}/>
            ))
        )}
      </View>
    </ScrollView>
  )
}

export default PhoneContacts