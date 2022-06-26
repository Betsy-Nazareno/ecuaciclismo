import { Formik } from 'formik'
import * as React from 'react'
import { ImageSourcePropType, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { guardarArchivo } from '../../../lib/googleCloudStorage'
import {
  agregarConsejo,
  editarConsejo,
} from '../../../lib/services/consejos.services'
import { Consejo } from '../../../models/Consejo.model'
import { RootState } from '../../../redux/store'
import { ConsejoValidationSchema } from '../../../schemas/ConsejoSchema'
import { BACKGROUND_COLORS, FOLDERS_STORAGE } from '../../../utils/constants'
import Input from '../atomos/Input'
import FieldFormulario from '../moleculas/FieldFormulario'
import HeaderScreen from '../moleculas/HeaderScreen'
import GalleryButton from '../atomos/GalleryButton'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import SecondaryButton from '../atomos/SecondaryButton'
import Spinner from '../atomos/Spinner'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { isDocumentResultType } from '../../../utils/ckeckTypes'
import { setHasModified } from '../../../redux/consejo'
import tw from 'twrnc'
import { DocumentResult } from 'expo-document-picker'
interface ConsejoFormularioProps {
  consejoProp?: Consejo
}

const ConsejoFormulario = ({ consejoProp }: ConsejoFormularioProps) => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const { hasModified } = useSelector((state: RootState) => state.consejo)
  const [isLoading, setIsLoading] = React.useState(false)
  const dispatch = useDispatch()
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()

  const imageSourceUri = { uri: consejoProp?.imagen } as ImageSourcePropType

  const initialValues = {
    informacion: consejoProp?.informacion || '',
    imagen: consejoProp?.imagen ? imageSourceUri : undefined,
  }

  const handleSubmit = async (props: Consejo) => {
    setIsLoading(true)
    const { imagen = {}, informacion = '' } = props || {}
    let path = consejoProp?.imagen || ''
    if (imagen && isDocumentResultType(imagen)) {
      path = await guardarArchivo(
        FOLDERS_STORAGE.CONSEJOS,
        imagen as DocumentResult
      )
    }
    const temp = { informacion: informacion, imagen: path }
    if (consejoProp && consejoProp.token) {
      await editarConsejo(temp, authToken as string, consejoProp.token)
    } else {
      await agregarConsejo(temp, authToken as string)
    }
    dispatch(setHasModified({ hasModified: !hasModified }))
    navigation.navigate('Inicio')

    setIsLoading(false)
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={tw`px-2`}>
      <HeaderScreen
        title="Consejo del día"
        message="¡Recomienda algo a la comunidad!"
        srcImage={require('../../../assets/consejo_icon.png')}
      ></HeaderScreen>
      <Formik
        initialValues={initialValues}
        validationSchema={ConsejoValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <>
            <FieldFormulario>
              <Input
                multiline
                text="Informacion"
                type="none"
                name="informacion"
                placeholder="Agrega información relevante para la comunidad"
                numberOfLines={6}
                value={values.informacion}
                setValue={(value) => setFieldValue('informacion', value)}
              />
            </FieldFormulario>

            <FieldFormulario>
              <GalleryButton
                field="imagen"
                icono={require('../../../assets/gallery_icon.png')}
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

export default ConsejoFormulario
