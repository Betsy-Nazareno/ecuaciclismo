import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import * as React from 'react'
import { Text, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'twrnc'
import { agregarNovedad } from '../../../lib/services/novedades.services'
import { PublicidadInterface } from '../../../models/Publicidad.model'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import { setNovedadHasModified } from '../../../redux/novedad'
import { RootState } from '../../../redux/store'
import { PublicidadValidationSchema } from '../../../schemas/PublicidadSchema'
import { BACKGROUND_COLORS, TEXT_COLORS } from '../../../utils/constants'
import GalleryButton from '../atomos/GalleryButton'
import Input from '../atomos/Input'
import SecondaryButton from '../atomos/SecondaryButton'
import Spinner from '../atomos/Spinner'
import FieldFormulario from '../moleculas/FieldFormulario'
import HeaderScreen from '../moleculas/HeaderScreen'

interface PublicidadFormularioProps {
  publicidadProp?: PublicidadInterface
}

const PublicidadFormulario = ({
  publicidadProp,
}: PublicidadFormularioProps) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { authToken } = useSelector((state: RootState) => state.user)
  const { novedadHasModified } = useSelector(
    (state: RootState) => state.novedad
  )
  const dispatch = useDispatch()
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()

  const initialValues = {
    titulo: '',
    imagen: undefined,
    descripcion: '',
    descripcion_corta: '',
    datos_contacto: {
      nombre: '',
      celular: '',
      direccion: '',
    },
  }

  const handleSubmit = async (props: PublicidadInterface) => {
    setIsLoading(true)
    await agregarNovedad(authToken || '', props)
    console.info(publicidadProp)
    setIsLoading(false)
    dispatch(setNovedadHasModified({ novedadHasModified: !novedadHasModified }))
    navigation.navigate('Inicio')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={tw`px-2`}>
      <HeaderScreen
        title="Novedad"
        message="??Difunde informaci??n novedosa a la comunidad!"
        srcImage={require('../../../assets/publicidad_icon.png')}
      ></HeaderScreen>
      <Formik
        initialValues={initialValues}
        validationSchema={PublicidadValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <>
            <FieldFormulario>
              <Input
                text="T??tulo"
                type="none"
                name="titulo"
                value={values.titulo}
                setValue={(value) => setFieldValue('titulo', value)}
                placeholder="Escribe un t??tulo..."
              />
            </FieldFormulario>

            <FieldFormulario>
              <Input
                text="Descripcion Corta"
                type="none"
                name="descripcion_corta"
                value={values.descripcion_corta}
                setValue={(value) => setFieldValue('descripcion_corta', value)}
                placeholder="Agrega una breve descripci??n..."
              />
            </FieldFormulario>

            <FieldFormulario>
              <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
                Imagen
              </Text>
              <FieldFormulario>
                <GalleryButton
                  field="imagen"
                  icono={require('../../../assets/gallery_icon.png')}
                />
              </FieldFormulario>
            </FieldFormulario>

            <FieldFormulario>
              <Input
                multiline
                text="Descripci??n"
                type="none"
                name="descripcion"
                placeholder="Agrega una descripci??n completa..."
                numberOfLines={4}
                value={values.descripcion}
                setValue={(value) => setFieldValue('descripcion', value)}
              />
            </FieldFormulario>

            <FieldFormulario>
              <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
                Datos del contacto
                <Text
                  style={tw`${TEXT_COLORS.DARK_GRAY} text-opacity-40 font-bold text-xs pl-2`}
                >
                  {` `} (Esta secci??n es opcional)
                </Text>
              </Text>
              <Input
                type="none"
                name="nombre"
                placeholder="Nombre"
                value={values.nombre}
                setValue={(value) => setFieldValue('nombre', value)}
              />
              <Input
                type="none"
                name="celular"
                placeholder="Celular"
                value={values.celular}
                setValue={(value) => setFieldValue('celular', value)}
              />
              <Input
                type="none"
                name="direcion"
                placeholder="Direcci??n"
                value={values.direccion}
                setValue={(value) => setFieldValue('direccion', value)}
              />
            </FieldFormulario>

            {isLoading ? (
              <Spinner />
            ) : (
              <SecondaryButton
                label="Publicar"
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

export default PublicidadFormulario
