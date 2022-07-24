import { Formik } from 'formik'
import * as React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import tw from 'twrnc'
import { agregarPublicacion } from '../../../lib/services/publicaciones.services'
import { Publicacion } from '../../../models/Publicaciones.model'
import { RootState } from '../../../redux/store'
import { PublicacionValidationSchema } from '../../../schemas/PublicacionSchema'
import HeaderScreen from '../../moleculas/HeaderScreen'
import PublicacionContenido from './PublicacionContenidoFormulario'

const PublicacionFormularioTemplate = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { authToken } = useSelector((state: RootState) => state.user)
  const initialValues = {
    titulo: '',
    etiquetas: [],
    descripcion: '',
    multimedia: [],
    audios: [],
  }

  const handleSubmit = async (publicacion: Publicacion) => {
    setIsLoading(true)
    await agregarPublicacion(publicacion, authToken || '')
    setIsLoading(false)
    // return
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
        <PublicacionContenido isSubmiting={isLoading} />
      </Formik>
    </ScrollView>
  )
}

export default PublicacionFormularioTemplate
