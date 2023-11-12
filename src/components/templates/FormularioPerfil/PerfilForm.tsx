import * as React from 'react'
import tw from 'twrnc'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import HeaderScreen from '../../moleculas/HeaderScreen'
import { Formik } from 'formik'
import FieldFormulario from '../../moleculas/FieldFormulario'
import Input from '../../moleculas/Input'
import {
  BACKGROUND_COLORS,
  generosCatalog,
  nivelesCatalog,
  TEXT_COLORS,
} from '../../../utils/constants'
import GalleryButton from '../../moleculas/GalleryButton'
import Gap from '../../atomos/Gap'
import Ruler from '../../atomos/Ruler'
import SelectCreatableBatches from '../../moleculas/SelectCreatableBatches'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { getTiposRuta } from '../../../lib/services/rutas.services'
import SecondaryButton from '../../atomos/SecondaryButton'
import RoundedSelectInput from '../../../../RoudedSelectInput'
import RoundedGallery from '../../moleculas/RoundedGallery'
import { usuarioValidationSchema } from '../../../schemas/usuarioValidationSchema'
import { enviarDatosUsuarios } from '../../../lib/services/user.services'
import Spinner from '../../atomos/Spinner'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootDrawerParamList, RootStackParamList, Screens, ScreensDrawer } from '../../../models/Screens.types'

const PerfilForm = ({ datosPerfil }: any) => {
  const [tiposRuta, setTiposRuta] = React.useState([])
  const { authToken, user } = useSelector((state: RootState) => state.user)
  const [isLoading, setIsLoading] = React.useState(false)
  const navigation =
    useNavigation<NavigationProp<RootDrawerParamList, ScreensDrawer>>()

  const initialValues = {
    nombre: datosPerfil?.first_name || '',
    apellido: datosPerfil?.last_name || '',
    edad: datosPerfil?.edad || undefined,
    usuario: datosPerfil?.username || '',
    telefono: datosPerfil?.telefono || '',
    foto: datosPerfil?.foto || undefined,
    email: datosPerfil?.email || '',
    genero: datosPerfil?.genero || '',
    peso: datosPerfil?.peso || undefined,
    nivel: datosPerfil?.nivel || '',
    rutas_interes: datosPerfil?.rutas_interes || [],
  }

  React.useEffect(() => {
    ;(async function () {
      authToken && setTiposRuta(await getTiposRuta(authToken))
    })()
  }, [])

  const handleSubmit = async (props: any) => {
    setIsLoading(true)
    if (authToken) {
      const response = await enviarDatosUsuarios(authToken, props)
      console.log(response);
    }
    navigation.navigate('Perfil', { userToken: user?.id_usuario || '' })

    setIsLoading(false)
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={tw`px-2 mb-8`}>
      <HeaderScreen
        title="Perfil"
        message="¡Presentate a la comunidad!"
        srcImage={require('../../../../assets/ciclista.png')}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={usuarioValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <>
            <FieldFormulario>
              <RoundedGallery
                field="foto"
                icono={require('../../../../assets/gallery_icon.png')}
                handleChange={(value) => setFieldValue('foto', value)}
                foto={values.foto}
              />

              <Gap py="1">
                <Input
                  text="Nombre"
                  type="none"
                  name="nombre"
                  value={values.nombre}
                  setValue={(value) => setFieldValue('nombre', value)}
                  placeholder="Nombre..."
                />
              </Gap>
              <Gap py="1">
                <Input
                  text="Apellido"
                  type="none"
                  name="apellido"
                  value={values.apellido}
                  setValue={(value) => setFieldValue('apellido', value)}
                  placeholder="Apellido..."
                />
              </Gap>

              <Gap py="3">
                <Input
                  text="Correo Electrónico"
                  type="none"
                  name="email"
                  value={values.email}
                  setValue={(value) => setFieldValue('email', value)}
                  placeholder="alguien@ejemplo.com"
                />
              </Gap>

              <Gap py="1">
                <Input
                  text="Usuario"
                  type="none"
                  name="usuario"
                  value={values.usuario}
                  setValue={(value) => setFieldValue('usuario', value)}
                  placeholder="username"
                />
              </Gap>

              <Gap py="3">
                <Input
                  text="Telefono"
                  type="telephoneNumber"
                  name="telefono"
                  value={values.telefono}
                  setValue={(value) => setFieldValue('telefono', value)}
                  placeholder="telefono"
                />
              </Gap>

              <Ruler style="w-10/12 mx-auto bg-[#e6e6e6] my-4" />

              <Gap py="1">
                <Input
                  text="Edad"
                  type="none"
                  name="edad"
                  value={values.edad}
                  setValue={(value) => setFieldValue('edad', value)}
                  placeholder="Edad..."
                />
              </Gap>

              <Gap py="1">
                <Text
                  style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}
                >
                  Género
                </Text>
                <RoundedSelectInput
                  values={generosCatalog}
                  setValuesSelected={(value) => setFieldValue('genero', value)}
                  placeholder="Femenino, Masculino..."
                  selectedValue={values.genero}
                />
              </Gap>

              <Gap py="3">
                <Text
                  style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}
                >
                  Peso
                </Text>
                <Input
                  type="none"
                  name="peso"
                  value={values.peso}
                  setValue={(value) => setFieldValue('peso', value)}
                  placeholder="120kg..."
                />
                <Text
                  style={tw`font-normal text-xs pl-2 text-black text-opacity-40`}
                >
                  Es imporantante que agregues tu peso para poder calcular las
                  calorías quemadas durante tus rutas
                </Text>
              </Gap>

              <Ruler style="w-10/12 mx-auto bg-[#e6e6e6] my-4" />

              <Gap py="1">
                <Text
                  style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2 pb-1`}
                >
                  Rutas de interés
                </Text>
                <SelectCreatableBatches
                  values={tiposRuta}
                  selectedValues={values.rutas_interes}
                  setValuesSelected={(tipo) => {
                    const exists = values.rutas_interes?.find(
                      (type: any) => type === tipo
                    )
                    if (!exists) {
                      setFieldValue('rutas_interes', [
                        ...(values.rutas_interes || []),
                        tipo,
                      ])
                    }
                  }}
                  deleteValue={(tipo) => {
                    setFieldValue('rutas_interes', [
                      ...(values.rutas_interes || []).filter(
                        (m: any) => m !== tipo
                      ),
                    ])
                  }}
                  placeholder="Montaña, Carretera..."
                  field={'rutas_interes'}
                />
              </Gap>

              <Gap py="3">
                <Text
                  style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2 pb-2`}
                >
                  Nivel
                </Text>

                <RoundedSelectInput
                  values={nivelesCatalog}
                  setValuesSelected={(value) => setFieldValue('nivel', value)}
                  placeholder="Básico, Intermedio..."
                  selectedValue={values.nivel}
                />
              </Gap>

              <Ruler style="w-10/12 mx-auto bg-[#e6e6e6] my-4" />

              {isLoading ? (
                <Spinner />
              ) : (
                <View style={tw`w-6/12 mx-auto mt-6`}>
                  <SecondaryButton
                    label="Guardar"
                    handleClick={handleSubmit}
                    style={BACKGROUND_COLORS.PRIMARY_BLUE}
                  />
                </View>
              )}
            </FieldFormulario>
          </>
        )}
      </Formik>
    </ScrollView>
  )
}

export default PerfilForm
