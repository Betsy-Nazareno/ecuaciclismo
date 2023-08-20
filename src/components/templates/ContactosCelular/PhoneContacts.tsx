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
  const { authToken} = useSelector((state: RootState) => state.user)
  const [refreshing, setRefreshing] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [hasPermission, setHasPermission] = React.useState(false)
  const [contactos, setContactos] = React.useState<DatosPhoneContact[]>([])
  const [filtredContactos, setFiltredContactos] = React.useState<DatosPhoneContact[]>([])
  const { secureContactsHasModified } = useSelector((state: RootState) => state.contactosSeguros)

  React.useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync()
      setHasPermission(status === 'granted')

      const contactosSeguros: DatosContactoSeguro[] = (await getContactosSeguros(authToken || '')) || []
      const result: DatosPhoneContact[] = []
      if(status == 'granted'){
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
      }
      setContactos(result)
      setFiltredContactos(result)
      setIsLoading(false)
      }
    )()
  }, [secureContactsHasModified])

  const onRefresh = async () => {
    setRefreshing(true)
    await getData()
    wait(3000).then(() => setRefreshing(false))
  }

  const getData = async () => {const contactosSeguros: DatosContactoSeguro[] = (await getContactosSeguros(authToken || '')) || []
    const result: DatosPhoneContact[] = []
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
    setFiltredContactos(result)
    setRefreshing(false)
    }
  }
  
  const text = useSelector((state: RootState) => state.busqueda.text)

  React.useEffect(() => {
    if (text) {
      setFiltredContactos(contactos?.filter(
        (contacto) =>
          contacto.nombre.toLowerCase().includes(text.toLowerCase())
      ))
    }else{
      setFiltredContactos(contactos)
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
          ) : filtredContactos?.length <= 0 ? (
            <WithoutResults styles="pt-12" />
          ) : (
            filtredContactos.map((contacto) => (
              // eslint-disable-next-line react/jsx-key
              <TarjetaContacto usuario={contacto} isUser={0}/>
            ))
        )}
      </View>
    </ScrollView>
  )
}

export default PhoneContacts