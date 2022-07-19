// import { useFormikContext } from 'formik'
import * as React from 'react'
import { Text, View } from 'react-native'
// import { Publicacion } from '../../../models/Publicaciones.model'
import FieldFormulario from '../../moleculas/FieldFormulario'
import tw from 'twrnc'
import { BACKGROUND_COLORS, TEXT_COLORS } from '../../../utils/constants'
import GalleryButton from '../../moleculas/GalleryButton'
import SecondaryButton from '../../atomos/SecondaryButton'
import Gap from '../../atomos/Gap'
import UnfocusButton from '../../atomos/UnfocusButton'
interface PublicacionAdjuntosProps {
  page: number
  setPage: (value: number) => void
}

const PublicacionAdjuntos = ({ page, setPage }: PublicacionAdjuntosProps) => {
  //   const { values, setFieldValue } = useFormikContext<Publicacion>()
  if (page !== 2) {
    return null
  }
  return (
    <>
      <FieldFormulario>
        <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
          Imagen
        </Text>
        <FieldFormulario>
          <GalleryButton
            field="imagen"
            icono={require('../../../../assets/gallery_icon.png')}
          />
        </FieldFormulario>
      </FieldFormulario>

      <FieldFormulario>
        <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
          Audios
        </Text>
      </FieldFormulario>

      <FieldFormulario>
        <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
          Archivos adjuntos
        </Text>
      </FieldFormulario>

      <View style={tw`flex flex-row justify-center items-center my-6`}>
        <Gap px="4">
          <UnfocusButton
            label="< Back"
            handleClick={() => setPage(1)}
            style={`${BACKGROUND_COLORS.ORANGE} w-32 shadow-sm`}
          />
        </Gap>
        <Gap px="4">
          <SecondaryButton
            label="Publicar"
            handleClick={() => setPage(1)}
            style={`${BACKGROUND_COLORS.ORANGE} w-48 shadow-sm`}
          />
        </Gap>
      </View>
    </>
  )
}

export default PublicacionAdjuntos
