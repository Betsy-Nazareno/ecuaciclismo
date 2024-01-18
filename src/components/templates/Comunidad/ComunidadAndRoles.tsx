import * as React from 'react'
import tw from 'twrnc'
import { Pressable, RefreshControl, StyleSheet, Text, Image, ScrollView, TouchableOpacity, View, Modal, TouchableWithoutFeedback } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import TarjetaUsuario from './TarjetaUsuario'
import { cambiarPermiso, getComunidad, hacerMiembro } from '../../../lib/services/user.services'
import ComunidadHeader from './ComunidadHeader'
import WithoutResults from '../../moleculas/WithoutResults'
import EmptyTarjetaContacto from '../../organismos/EmptyTarjetaContacto'
import Gap from '../../atomos/Gap'
import AdminValidator from '../AdminValidator'
import { CustomText } from '../../atomos/CustomText'
import { TEXT_COLORS, imagesRoutes } from '../../../utils/constants'
import { capitalize } from '../../../utils/capitalizeText'
import Ruler from '../../atomos/Ruler'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootDrawerParamList, ScreensDrawer } from '../../../models/Screens.types'
import { recuperarBicicletasPorUsuario } from '../../../lib/services/bicicleta.services'

export interface DatosBasicosUser {
  usuario_id: number
  admin: boolean
  first_name: string
  last_name: string
  foto?: string
  tipo?: string
  isPropietary: number
  token_usuario: string
}

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}
type MenuVisibility = Record<string, boolean>;
type AdminVisibilty = Record<string, boolean>;
type TipoUserVisibilty = Record<string, string>;
const ComunidadAndRoles = () => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const [comunidad, setComunidad] = React.useState<DatosBasicosUser[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [refreshing, setRefreshing] = React.useState(false)
  const { text, buildFiltros } = useSelector((state: RootState) => state.busqueda)
  const [filteredUsers, setFilteredUsers] = React.useState<DatosBasicosUser[]>([])
  const navigation =
    useNavigation<NavigationProp<RootDrawerParamList, ScreensDrawer>>()

  const [menuVisibility, setMenuVisibility] = React.useState<MenuVisibility>({});
  const [adminVisibility, setAdminVisibility] = React.useState<AdminVisibilty>({});
  const [tipoUserVisibility, setTipoUserVisibility] = React.useState<TipoUserVisibilty>({});
  const [selectedUser, setSelectedUser] = React.useState<DatosBasicosUser | null>(null);
  React.useEffect(() => {
    (async () => {
      const comunity = (await getComunidad(authToken || '')) || []
      setComunidad(comunity)
      setFilteredUsers(comunity)
      setIsLoading(false)
      // Mapeo para inicializar adminVisibility después de cargar todas las cartillas
    })()
  }, [])
  React.useEffect(() => {
    // Mapeo para inicializar adminVisibility después de cargar todas las cartillas
    const initialAdminVisibility: AdminVisibilty = {};
    const initTipoUserVisibility: TipoUserVisibilty = {};
    filteredUsers.forEach((ciclista) => {
      initialAdminVisibility[ciclista.token_usuario] = !!ciclista.admin;
      initTipoUserVisibility[ciclista.token_usuario] = ciclista.tipo!;
    });
    
    setAdminVisibility(initialAdminVisibility);
    setTipoUserVisibility(initTipoUserVisibility);
  }, [filteredUsers]);
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
        etiquetas.includes(user.tipo ?? '') || (user.admin && etiquetas.includes('Administrador'))
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
          filteredUsers?.map((ciclista) => {

            const handlePress = () => {
              if (!ciclista?.admin) return
              navigation.navigate('Perfil', { userToken: ciclista.token_usuario })
            }
            const showMenu = () => {
              if (!menuVisibility[ciclista.token_usuario]) {
                setMenuVisibility((prevVisibility) => ({
                  ...prevVisibility,
                  [ciclista.token_usuario]: true,
                }));
              } else {
                setMenuVisibility((prevVisibility) => ({
                  ...prevVisibility,
                  [ciclista.token_usuario]: false,
                }));
              }
              setSelectedUser(ciclista);
            };
            const showBicicletaPress = async () => {
              setMenuVisibility((prevVisibility) => ({
                ...prevVisibility,
                [selectedUser!.token_usuario]: false,
              }));
              navigation.navigate('BicicletasVisitor', { token_usuario: ciclista.token_usuario })
              
            };
            const changeRole = async () => {
              
              if (authToken && selectedUser) {
                const newAdminValue = !adminVisibility[selectedUser.token_usuario];
                await cambiarPermiso(selectedUser.token_usuario, newAdminValue, authToken);
                setAdminVisibility((prevVisibility) => ({
                  ...prevVisibility,
                  [selectedUser.token_usuario]: newAdminValue,
                }));
                setMenuVisibility((prevVisibility) => ({
                  ...prevVisibility,
                  [selectedUser.token_usuario]: false,
                }));
               
              }
            };
            const changeRoleMember = async () => {
              
              if (authToken && selectedUser) {
                const newAdminValue = tipoUserVisibility[selectedUser.token_usuario];
                const isNotMember = newAdminValue !== "Miembro" ? true: false;
                await hacerMiembro(selectedUser.token_usuario, isNotMember, authToken);
                setTipoUserVisibility((prevVisibility) => ({
                  ...prevVisibility,
                  [selectedUser.token_usuario]: isNotMember?"Miembro":"No Verificado",
                }));
                setMenuVisibility((prevVisibility) => ({
                  ...prevVisibility,
                  [selectedUser.token_usuario]: false,
                }));
                
              }
            };
            const labels: string[] = Object.keys(imagesRoutes)
            let indx = 0
            const label: string = tipoUserVisibility[ciclista.token_usuario] ?? ''
            while (indx < labels.length && label != labels[indx]) { indx++ }
            let val
            (indx >= labels.length) ?
              (val = require("../../../../assets/failed.png")) : (val = Object.values(imagesRoutes)[indx])

            return (
              <View key={ciclista.token_usuario}>
                <Pressable
                  style={tw`bg-white rounded-xl w-full my-1 py-2 flex flex-row justify-between`}
                  onPress={handlePress}
                >
                  <View style={tw`flex flex-row items-center`}>
                    <Image
                      source={
                        ciclista.foto
                          ? { uri: ciclista.foto }
                          : require('../../../../assets/user.png')
                      }
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 400 / 2,
                      }}
                      resizeMode="contain"
                    />
                    <Gap px="4">
                      <View style={tw`flex flex-row items-center`}>
                        <CustomText style={`${TEXT_COLORS.DARK_BLUE}`}>
                          {capitalize(ciclista.first_name)} {capitalize(ciclista.last_name)}
                        </CustomText>
                        <View style={{ paddingLeft: 9 }}>
                          {adminVisibility[ciclista.token_usuario] ? (
                            <Image
                              source={require('../../../../assets/admin.png')}
                              style={{ width: 20, height: 20 }}
                            />
                          ) : (label !== 'No verificado' && label !== '') ? (
                            <Image
                              source={val}
                              style={{ width: 20, height: 20 }}
                            />
                          ) : null}
                        </View>
                      </View>
                      {adminVisibility[ciclista.token_usuario] ?
                        (<Text style={tw`text-xs text-black text-opacity-40`}>Administrador</Text>)
                        : (<Text style={tw`text-xs text-black text-opacity-40`}>{label}</Text>)
                      }
                    </Gap>

                  </View>
                  <AdminValidator>
                    <TouchableOpacity key={ciclista.token_usuario} onPress={showMenu}>
                      <Image source={require('../../../../assets/menu_icon.png')} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>

                  </AdminValidator>
                  {/* Menú emergente */}

                  {
                    /*
                    <Switch
                    trackColor={{ false: '#e6e6e6', true: '#81b0ff' }}
                    thumbColor="#3FA1EE"
                    onValueChange={changeRole}
                    value={admin}
                  />
                    */
                  }

                </Pressable>
                {menuVisibility[ciclista.token_usuario] && (
                  <View key={ciclista.token_usuario} style={styles.menuContainer}>
                    {/* Contenido del menú */}
                    {/* Por ejemplo, dos opciones en el menú */}
                    <TouchableOpacity style={styles.menuOption} onPress={changeRole}>
                      {!adminVisibility[ciclista.token_usuario] ?
                        <Text>Hacer Administrador</Text> :
                        <Text>Quitar Administrador</Text>
                      }
                    </TouchableOpacity>
                    <Ruler style="w-11/12 mx-auto" />
                    <TouchableOpacity style={styles.menuOption} onPress={changeRoleMember}>
                      {tipoUserVisibility[ciclista.token_usuario] === "Miembro" ?
                        <Text>Quitar Miembro</Text> :
                        <Text>Hacer Miembro</Text>
                      }
                    </TouchableOpacity>
                    <Ruler style="w-11/12 mx-auto" />
                    <TouchableOpacity style={styles.menuOption} onPress={showBicicletaPress}>
                      <Text>Ver Bicicleta</Text>
                    </TouchableOpacity>
                  </View>
                )}

              </View>
            )
          })
        )}
      </View>
      
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 40,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    width: 250,
    padding: 8,
    elevation: 10,
    zIndex: 1,
  },
  menuOption: {
    paddingVertical: 8,
    zIndex: 2,
    paddingHorizontal: 12,

  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    margin: 40,
    borderRadius: 8,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    marginLeft: 11,
    marginRight: 11
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});
export default ComunidadAndRoles
