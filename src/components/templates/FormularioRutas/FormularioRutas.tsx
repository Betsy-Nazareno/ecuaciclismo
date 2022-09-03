import * as React from 'react'
import tw from 'twrnc'
import { ScrollView, Text, View } from 'react-native'
import HeaderScreen from '../../moleculas/HeaderScreen'
import { Formik } from 'formik'
import { RutasValidationSchema } from '../../../schemas/RutasValidationSchema'
import FieldFormulario from '../../moleculas/FieldFormulario'
import Input from '../../moleculas/Input'
import { BACKGROUND_COLORS, TEXT_COLORS } from '../../../utils/constants'
import SelectCreatableList from '../../moleculas/SelectCreatableList'
import GalleryMultiImages from '../../organismos/GalleryMultiImages'
import MapViewSelectUbication from '../../moleculas/MapViewSelectUbication'
import Spinner from '../../atomos/Spinner'
import SecondaryButton from '../../atomos/SecondaryButton'
import SelectCreatableBatches from '../../moleculas/SelectCreatableBatches'
import {
  editarRuta,
  getColaboracionesRutas,
  getGruposEncuentro,
  getRequisitos,
  getTiposRuta,
  guardarRuta,
} from '../../../lib/services/rutas.services'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { Ruta } from '../../../models/Rutas'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import {
  getAdminTokens,
  getAllTokens,
  getCiclistasToken,
} from '../../../lib/services/notifications.services'
import { usePermissionsNotifications } from '../../../hooks/usePermissionsNotifications'
import { capitalize } from '../../../utils/capitalizeText'
import FormularioRutasGrupos from './FormularioRutasGrupos'
import Gap from '../../atomos/Gap'
import SmallFieldFecha from '../../moleculas/SmallFieldFecha'
import ArrowDivider from '../../atomos/ArrowDivider'
import FieldTitle from '../../atomos/FieldTitle'
import CustomSwitch from '../../atomos/CustomSwitch'
import { setRutaHasModified } from '../../../redux/ruta'

interface FormularioRutasProp {
  rutaProp: Ruta
}
const FormularioRutas = ({ rutaProp }: FormularioRutasProp) => {
  const { authToken } = useSelector((state: RootState) => state.sesion)
  const { user } = useSelector((state: RootState) => state.user)
  const [isLoading, setIsLoading] = React.useState(false)
  const [requisitosCatalog, setRequisitosCatalog] = React.useState([])
  const [tiposRutaCatalog, setTiposRutaCatalog] = React.useState([])
  const [colaboracionesCatalog, setColaboracionesCatalog] = React.useState([])
  const [hasRequirements, setHasRequirements] = React.useState(false)
  const [hasCollaborations, setHasCollaborations] = React.useState(false)
  const [hasGroups, setHasGroups] = React.useState(false)
  const [cuposLimitados, setCuposLimitados] = React.useState(false)
  const [grupos, setGrupos] = React.useState([])
  const { rutaHasModified } = useSelector((state: RootState) => state.ruta)
  const dispatch = useDispatch()
  const { sendPushNotification } = usePermissionsNotifications()
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()

  const converterDates = (date: any) => {
    if (!date) return undefined
    const [fecha] = date.split(' ')
    return new Date(fecha)
  }

  const initialValues = {
    nombre: rutaProp?.nombre || '',
    cupos_disponibles: rutaProp?.cupos_disponibles || undefined,
    requisitos: rutaProp?.requisitos || [],
    tipoRuta: rutaProp?.tipoRuta || [],
    fotos: rutaProp?.fotos || [],
    lugar: rutaProp?.lugar || '',
    ubicacion: rutaProp?.ubicacion || {
      coordinateX: {
        latitude: -2.1538019492930163,
        longitude: -79.88844282925129,
      },
      coordinateY: {
        latitude: -2.1453200715782175,
        longitude: -79.89056378602983,
      },
    },
    fecha_inicio: converterDates(rutaProp?.fecha_inicio) || undefined,
    fecha_fin: converterDates(rutaProp?.fecha_fin) || undefined,
    descripcion: rutaProp?.descripcion || '',
    grupos_encuentro: rutaProp?.grupos_encuentro || [],
    colaboraciones: rutaProp?.colaboraciones || [],
  }

  React.useEffect(() => {
    ;(async function () {
      if (authToken) {
        setRequisitosCatalog(await getRequisitos(authToken))
        setTiposRutaCatalog(await getTiposRuta(authToken))
        setColaboracionesCatalog(await getColaboracionesRutas(authToken))
        setGrupos(await getGruposEncuentro(authToken))
      }
    })()
  }, [])

  React.useEffect(() => {
    if (rutaProp) {
      setCuposLimitados(!!rutaProp.cupos_disponibles)
      setHasRequirements(!!(rutaProp.requisitos.length > 0))
      setHasCollaborations(!!(rutaProp.colaboraciones.length > 0))
      setHasGroups(
        !!(rutaProp.grupos_encuentro && rutaProp.grupos_encuentro?.length > 0)
      )
    }
  }, [rutaProp])

  const sendNotificationToAdmins = async () => {
    if (!authToken) return
    const tokens = await getAdminTokens(authToken)
    await sendPushNotification({
      tokens,
      title: 'Nueva ruta propuesta',
      body: `${capitalize(user?.first_name)} ${capitalize(
        user?.last_name
      )} ha sugerido una ruta para la comunidad y necesita aprobación`,
    })
  }

  const sendNotificationEditRutaToUsers = async () => {
    if (!authToken) return
    const tokens = await getCiclistasToken(authToken)
    await sendPushNotification({
      tokens,
      title: 'Ruta Modificada',
      body: `Se han modificado los detalles de la ruta ${rutaProp?.nombre}. Por favor, revisa esta actividad`,
    })
  }

  const sendNotificationNewRutaToUsers = async (nombre: string) => {
    if (!authToken) return
    const tokens = await getAllTokens(authToken)
    await sendPushNotification({
      tokens,
      title: 'Nueva ruta planificada',
      body: `${nombre} ha sido planificada para la comunidad. ¡Únete al recorrido!`,
    })
  }

  const handleSubmit = async (prop: Ruta) => {
    setIsLoading(true)
    if (authToken) {
      if (rutaProp && rutaProp.token && rutaProp.nombre) {
        await editarRuta(authToken, prop, rutaProp.token)
        // await sendNotificationEditRutaToUsers()
      } else {
        await guardarRuta(authToken, prop)
        if (!user?.admin) {
          // await sendNotificationToAdmins()
        } else {
          // await sendNotificationNewRutaToUsers(prop.nombre)
        }
      }
    }
    setIsLoading(false)
    dispatch(setRutaHasModified({ rutaHasModified: !rutaHasModified }))
    navigation.navigate('Rutas')
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={tw`px-2 mb-8`}
      keyboardShouldPersistTaps={'handled'}
    >
      <HeaderScreen
        title="Rutas"
        message="¡Planifica actividades para la comunidad!"
        srcImage={require('../../../../assets/ruta_icon.png')}
      />
      <Formik<Ruta>
        initialValues={initialValues}
        validationSchema={RutasValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <>
            <FieldFormulario>
              <Gap py="2">
                <Input
                  text="Nombre"
                  type="none"
                  name="nombre"
                  placeholder="Nombre de la ruta..."
                  value={values.nombre}
                  setValue={(value) => setFieldValue('nombre', value)}
                />
              </Gap>

              <Gap py="2">
                <Input
                  text="Lugar"
                  type="none"
                  name="lugar"
                  placeholder="Añade una referencia del punto de partida..."
                  value={values.lugar}
                  setValue={(value) => setFieldValue('lugar', value)}
                />
              </Gap>

              <Gap py="2">
                <Text
                  style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}
                >
                  Tipo de Ruta
                </Text>
                <SelectCreatableBatches
                  values={tiposRutaCatalog}
                  selectedValues={values.tipoRuta}
                  setValuesSelected={(tipo) => {
                    const exists = values.tipoRuta.find(
                      (type: any) => type === tipo
                    )
                    if (!exists) {
                      setFieldValue('tipoRuta', [
                        ...(values.tipoRuta || []),
                        tipo,
                      ])
                    }
                  }}
                  deleteValue={(tipo) => {
                    setFieldValue('tipoRuta', [
                      ...(values.tipoRuta || []).filter((m: any) => m !== tipo),
                    ])
                  }}
                  placeholder="Montaña, Carretera..."
                  field={'tiposRuta'}
                />
              </Gap>

              <Gap py="2">
                <Input
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  text="Descripcion del evento"
                  type="none"
                  name="descripcion"
                  placeholder="Agrega una descripción del evento..."
                  value={values.descripcion}
                  setValue={(value) => setFieldValue('descripcion', value)}
                />
              </Gap>
            </FieldFormulario>

            <FieldFormulario>
              <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
                Fotos
              </Text>
              <GalleryMultiImages
                field="fotos"
                setFieldValue={setFieldValue}
                values={values.fotos}
                allowedFiles={['image/*']}
                icon={require('../../../../assets/ruta_gallery.png')}
                placeholder="¡Agrega algunas imágenes de la ruta!"
              />
            </FieldFormulario>

            <FieldFormulario>
              <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
                Horario Planificado
              </Text>

              <View style={tw`flex flex-row justify-between items-center mx-8`}>
                <View style={tw`flex flex-col justify-between items-center`}>
                  <Text style={tw`${TEXT_COLORS.DARK_BLUE} text-sm my-2`}>
                    Fecha de Inicio
                  </Text>
                  <SmallFieldFecha
                    fecha={values.fecha_inicio}
                    setFecha={(value) => setFieldValue('fecha_inicio', value)}
                  />
                </View>
                <ArrowDivider />
                <View style={tw`flex flex-col justify-between items-center`}>
                  <Text style={tw`${TEXT_COLORS.DARK_BLUE} text-sm my-2`}>
                    Fecha de Fin
                  </Text>
                  <SmallFieldFecha
                    fecha={values.fecha_fin}
                    setFecha={(value) => setFieldValue('fecha_fin', value)}
                  />
                </View>
              </View>
            </FieldFormulario>

            <FieldFormulario>
              <Gap py="0">
                <View style={tw`flex flex-row items-center justify-between `}>
                  <FieldTitle text="Cupos Limitados" />
                  <CustomSwitch
                    handleClick={() => setCuposLimitados(!cuposLimitados)}
                    active={cuposLimitados}
                  />
                </View>
                {cuposLimitados ? (
                  <Input
                    type="none"
                    name="cupos"
                    placeholder="Cantidad de participantes admitidos..."
                    value={values.cupos_disponibles}
                    setValue={(value) =>
                      setFieldValue('cupos_disponibles', value)
                    }
                  />
                ) : null}
              </Gap>

              <Gap py="2">
                <View style={tw`flex flex-row items-center justify-between `}>
                  <FieldTitle text="Requisitos para participar" />
                  <CustomSwitch
                    handleClick={() => setHasRequirements(!hasRequirements)}
                    active={hasRequirements}
                  />
                </View>

                {hasRequirements ? (
                  <SelectCreatableList
                    field="requisitos"
                    placeholder="Insumos, Nivel de ciclista..."
                    values={requisitosCatalog}
                    selectedValues={values.requisitos}
                    setValuesSelected={(valor) => {
                      const exists = values.requisitos.find(
                        (requisito) => requisito === valor
                      )
                      if (!exists) {
                        setFieldValue('requisitos', [
                          ...(values.requisitos || []),
                          valor,
                        ])
                      }
                    }}
                    deleteValue={(valor) => {
                      setFieldValue('requisitos', [
                        ...(values.requisitos || []).filter((m) => m !== valor),
                      ])
                    }}
                  />
                ) : null}
              </Gap>

              <Gap py="2">
                <View style={tw`flex flex-row items-center justify-between`}>
                  <FieldTitle text="Colaboraciones de los ciclistas" />
                  <CustomSwitch
                    handleClick={() => setHasCollaborations(!hasCollaborations)}
                    active={hasCollaborations}
                  />
                </View>
                {hasCollaborations ? (
                  <SelectCreatableList
                    field="colaboraciones"
                    placeholder="Gasas, Alcohol..."
                    values={colaboracionesCatalog}
                    selectedValues={values.colaboraciones}
                    setValuesSelected={(valor) => {
                      const exists = values.colaboraciones.find(
                        (colaboracion) => colaboracion === valor
                      )
                      if (!exists) {
                        setFieldValue('colaboraciones', [
                          ...(values.colaboraciones || []),
                          valor,
                        ])
                      }
                    }}
                    deleteValue={(valor) => {
                      setFieldValue('colaboraciones', [
                        ...(values.colaboraciones || []).filter(
                          (m) => m !== valor
                        ),
                      ])
                    }}
                  />
                ) : null}
              </Gap>

              <View style={tw`flex flex-row items-center justify-between`}>
                <FieldTitle text="Puntos de encuentro" />
                <CustomSwitch
                  handleClick={() => setHasGroups(!hasGroups)}
                  active={hasGroups}
                />
              </View>

              {hasGroups ? (
                <FormularioRutasGrupos
                  grupos={grupos}
                  field="grupos_encuentro"
                />
              ) : null}
            </FieldFormulario>

            <FieldFormulario>
              <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
                Recorrido
              </Text>
              <MapViewSelectUbication
                select
                field="ubicacion"
                setField={setFieldValue}
                value={values.ubicacion}
              />
            </FieldFormulario>

            {isLoading ? (
              <Spinner />
            ) : (
              <SecondaryButton
                label={
                  rutaProp ? 'Guardar' : user?.admin ? 'Publicar' : 'Proponer'
                }
                handleClick={handleSubmit}
                style={`${BACKGROUND_COLORS.PRIMARY_BLUE} w-6/12 mx-auto mt-6`}
              />
            )}
          </>
        )}
      </Formik>
    </ScrollView>
  )
}

export default FormularioRutas
