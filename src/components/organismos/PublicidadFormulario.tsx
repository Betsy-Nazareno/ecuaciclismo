import { Formik } from 'formik'
import * as React from 'react'
import { Text, ScrollView } from 'react-native'
import tw from 'twrnc'
import { PublicidadInterface } from '../../../models/Publicidad.model'
import { PublicidadValidationSchema } from '../../../schemas/PublicidadSchema'
import { BACKGROUND_COLORS } from '../../../utils/constants'
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

  const handleSubmit = () => {
    setIsLoading(false)
    console.info(publicidadProp)
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={tw`px-2`}>
      <HeaderScreen
        title="Publicidad"
        message="¡Promociona algo entre la comunidad!"
        srcImage={require('../../../assets/publicidad_icon.png')}
      ></HeaderScreen>
      <Formik
        initialValues={{}}
        validationSchema={PublicidadValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <>
            <FieldFormulario>
              <Input
                multiline
                text="Título"
                type="none"
                name="informacion"
                placeholder="Agrega un título llamativo"
              />
            </FieldFormulario>

            <FieldFormulario>
              <GalleryButton
                field="imagen"
                icono={require('../../../assets/gallery_icon.png')}
              />
            </FieldFormulario>

            <FieldFormulario>
              <Input
                multiline
                text="Descripción"
                type="none"
                name="descripción"
                placeholder="Agrega una descripción completa del producto/servicio"
                numberOfLines={4}
              />
            </FieldFormulario>

            <FieldFormulario>
              <Text>Datos del contacto</Text>
              <Input
                type="none"
                name="datos_contacto.nombre"
                placeholder="Nombre"
              />
              <Input
                type="none"
                name="datos_contacto.celular"
                placeholder="Celular"
              />
              <Input
                type="none"
                name="datos_contacto.direcion"
                placeholder="Dirección"
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
