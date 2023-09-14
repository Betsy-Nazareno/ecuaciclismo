import * as React from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import tw from 'twrnc'
import { Pressable, RefreshControl, ScrollView, View, Text, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import TarjetaSelectUsers from './TarjetaSelectUsers'
import SelectUsersHeader from './SelectUsersHeader'
import { User } from './VerifiedRegister'
import { getComunidad } from '../../../lib/services/user.services'
import EmptyTarjetaContacto from '../../organismos/EmptyTarjetaContacto'
import WithoutResults from '../../moleculas/WithoutResults'
import { BACKGROUND_COLORS } from '../../../utils/constants'
import { setRegistroVerificado, setElection } from '../../../redux/RegistroVerificado'

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

const SelectUsers = () => {
  const { authToken, user } = useSelector((state: RootState) => state.user)
  const [isLoading, setIsLoading] = React.useState(true)
  const [refreshing, setRefreshing] = React.useState(false)
  const [comunity, setComunity] = React.useState<User[]>([])
  const [filteredComunity, setFilteredComunity] = React.useState<User[]>([])
  const { text, buildFiltros } = useSelector((state: RootState) => state.busqueda)
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
  const [disabled, setDisabled] = React.useState<boolean>(true)
  const { election, isElectionModified } = useSelector((state: RootState) => state.verificado)
  const dispatch = useDispatch()

  React.useEffect(() => {
    (async () => {
      const comunidad : User[] = (await getComunidad(authToken || '')) || []
      const result : User[] = comunidad.filter((val) =>
        (val.token_usuario !== user?.id_usuario)
        && (val.tipo !== 'No verificado' || val.admin)
      )
      setComunity(result)
      setFilteredComunity(result)
      setIsLoading(false)
    })()
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    await getData()
    wait(3000).then(() => setRefreshing(false))
  }

  const getData = async () => {
    const comunidad : User[] = (await getComunidad(authToken || '')) || []
    const result : User[] = comunidad.filter((val) =>
      (val.token_usuario !== user?.id_usuario)
      && (val.tipo !== 'No verificado' || val.admin)
    )
    setComunity(result)
    setFilteredComunity(result)
    setIsLoading(false)
  }
  
  React.useEffect(() => {
    const etiquetas: string[] = buildFiltros.etiquetas ?? []
    let result = []
    if (text) {
      result = comunity?.filter(
        (val) =>
        val.first_name.toLowerCase().includes(text.toLowerCase()) ||
        val.last_name.toLowerCase().includes(text.toLowerCase())
      )
    } else {
      result = comunity
    }
    if (etiquetas.length > 0) {
      result = result?.filter((val) =>
        etiquetas.includes(val.tipo??'') || (val.admin && etiquetas.includes('Administrador'))
      )
    }
    setFilteredComunity(result)
  }, [text, buildFiltros])

  const handlePress = () => {
    dispatch(setRegistroVerificado({users: election}))
    dispatch(setElection({election: []}))
    navigation.navigate('RegistroVerificado')
  }

  React.useEffect(() => {
    (election.length === 0) ? setDisabled(true): setDisabled(false)
  }, [isElectionModified])

  return (
 <View style={tw`flex-1`}>
      <ScrollView
        style={tw`px-2 py-4`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <SelectUsersHeader />
        <View style={tw`my-4`}>
          {isLoading ? (
            <>
              <EmptyTarjetaContacto />
              <EmptyTarjetaContacto />
              <EmptyTarjetaContacto />
            </>
          ) : filteredComunity?.length <= 0 ? (
            <WithoutResults styles="pt-12" />
          ) : (
            filteredComunity.map((ciclista) => (
              <TarjetaSelectUsers usuario={ciclista} />
            ))
          )}
        </View>
      </ScrollView>

      <View style={tw`absolute bottom-0 right-0 p-4`}>
        <Pressable
          style={tw`${BACKGROUND_COLORS.ORANGE} rounded-full py-2 w-16 h-16 items-center justify-center ${(disabled) ? 'opacity-50' : 'opacity-100'}`}
          disabled={disabled}
          onPress={() => handlePress()}
        >
          <Text style={tw`text-m font-bold text-white`}>Hecho</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default SelectUsers
