import { Formik } from 'formik'
import * as React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import tw from 'twrnc'
import { PublicacionValidationSchema } from '../../../schemas/PublicacionSchema'
import HeaderScreen from '../../moleculas/HeaderScreen'
import PublicacionAdjuntos from './PublicacionAdjuntos'
import PublicacionContenido from './PublicacionContenidoFormulario'

const PublicacionFormularioTemplate = () => {
  const [page, setPage] = React.useState(1)
  const initialValues = {
    titulo: '',
    etiquetas: [],
    descripcion: '',
    fotos: [],
    audios: [],
    adjuntos: [],
  }

  const handleSubmit = async () => {
    return
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
        <>
          <PublicacionContenido setPage={setPage} page={page} />
          <PublicacionAdjuntos setPage={setPage} page={page} />
        </>
      </Formik>
    </ScrollView>
  )
}

export default PublicacionFormularioTemplate
