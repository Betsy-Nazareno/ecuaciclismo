import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import * as React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'twrnc'
import {
  agregarPublicacion,
  editarPublicacion,
} from '../../../lib/services/publicaciones.services'
import { Publicacion } from '../../../models/Publicaciones.model'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import { setPublicacionHasModified } from '../../../redux/publicacion'
import { RootState } from '../../../redux/store'
import { PublicacionValidationSchema } from '../../../schemas/PublicacionSchema'
import HeaderScreen from '../../moleculas/HeaderScreen'
import PublicacionContenido from './PublicacionContenidoFormulario'

interface PublicacionFormularioProps {
  publicacionProp?: Publicacion
}

const PublicacionFormularioTemplate = ({
  publicacionProp,
}: PublicacionFormularioProps) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { authToken } = useSelector((state: RootState) => state.user)
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
  const { publicacionHasModified } = useSelector(
    (state: RootState) => state.publicacion
  )
  const dispatch = useDispatch()

  const initialValues = {
    titulo: publicacionProp?.titulo || '',
    etiquetas: publicacionProp?.etiquetas || [],
    descripcion: publicacionProp?.descripcion || '',
    multimedia: publicacionProp?.multimedia || [],
    audios: publicacionProp?.audios || [],
  }

  const handleSubmit = async (publicacion: Publicacion) => {
    setIsLoading(true)
    if (publicacionProp && authToken && publicacionProp.token) {
      await editarPublicacion(publicacion, authToken, publicacionProp.token)
    } else if (authToken) {
      await agregarPublicacion(publicacion, authToken)
    }
    dispatch(
      setPublicacionHasModified({
        publicacionHasModified: !publicacionHasModified,
      })
    )
    setIsLoading(false)
    navigation.navigate('Publicaciones')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={tw`px-2 mb-8`}>
      <HeaderScreen
        title="Publicación"
        message="¡Dile a la comunidad lo que estás pensando!"
        srcImage={require('../../../../assets/nueva_publicacion_icon.png')}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={PublicacionValidationSchema}
        onSubmit={handleSubmit}
      >
        <PublicacionContenido
          isSubmiting={isLoading}
          isEdit={!!publicacionProp}
        />
      </Formik>
    </ScrollView>
  )
}

export default PublicacionFormularioTemplate
