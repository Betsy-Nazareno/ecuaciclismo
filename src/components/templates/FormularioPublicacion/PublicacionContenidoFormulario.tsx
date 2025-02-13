import { useFormikContext } from 'formik'
import * as React from 'react'
import { Text, View } from 'react-native'
import {
  MultimediaResult,
  Publicacion,
} from '../../../models/Publicaciones.model'
import {
  BACKGROUND_COLORS,
  etiquetasPublicaciones,
  MIME_TYPES,
  TEXT_COLORS,
} from '../../../utils/constants'
import Input from '../../moleculas/Input'
import SecondaryButton from '../../atomos/SecondaryButton'
import FieldFormulario from '../../moleculas/FieldFormulario'
import tw from 'twrnc'
import SelectCreatableBatches from '../../moleculas/SelectCreatableBatches'
import GalleryMultiImages from '../../organismos/GalleryMultiImages'
import CreatableAudioRecord from '../../organismos/CreatableAudioRecord'
import { Audio } from 'expo-av'
import Spinner from '../../atomos/Spinner'

interface PublicacionContenidoProps {
  isSubmiting: boolean
  isEdit: boolean
}

const PublicacionContenidoFormulario = ({
  isSubmiting,
  isEdit,
}: PublicacionContenidoProps) => {
  const { values, setFieldValue, handleSubmit } =
    useFormikContext<Publicacion>()

  React.useEffect(() => {
    if (isEdit) {
      const audios = values.multimedia?.filter((file) => {
        const fileResult = file as unknown as MultimediaResult
        return fileResult.tipo === MIME_TYPES.AUDIO
      })
      setFieldValue('audios', audios)
    }
  }, [])

  const addAudio = (audio: Audio.Recording) => {
    const { audios } = values
    setFieldValue('audios', [...(audios || []), audio])
  }

  const deleteAudio = (uri: string) => {
    const { audios } = values
    setFieldValue('audios', [
      ...(audios || []).filter((audio) => {
        if (isEdit) {
          const audioResult = audio as unknown as MultimediaResult
          return audioResult.link !== uri
        } else {
          return audio._uri !== uri
        }
      }),
    ])
  }

  const addEtiquetas = (value: string) => {
    const exists = values.etiquetas.find((etiqueta) => etiqueta === value)
    if (!exists) {
      const { etiquetas } = values
      setFieldValue('etiquetas', [...(etiquetas || []), value])
    }
  }

  const deleteEtiqueta = (value: string) => {
    const { etiquetas } = values
    setFieldValue('etiquetas', [
      ...(etiquetas || []).filter((m) => m !== value),
    ])
  }
  return (
    <>
      <FieldFormulario>
        <Input
          text="Título"
          type="none"
          name="titulo"
          value={values.titulo}
          setValue={(value) => setFieldValue('titulo', value)}
          placeholder="Escribe un título..."
        />
      </FieldFormulario>

      <FieldFormulario>
        <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
          Etiquetas
        </Text>
        <SelectCreatableBatches
          values={etiquetasPublicaciones}
          selectedValues={values.etiquetas}
          setValuesSelected={addEtiquetas}
          deleteValue={deleteEtiqueta}
          placeholder="Recomendaciones, Ofertas..."
          field={'etiquetas'}
        />
      </FieldFormulario>

      <FieldFormulario>
        <Input
          multiline
          numberOfLines={6}
          text="Descripción"
          type="none"
          name="descripcion"
          value={values.descripcion}
          textAlignVertical="top"
          stylesInput="pt-2"
          setValue={(value) => setFieldValue('descripcion', value)}
          placeholder="Agrega una descripción..."
        />
      </FieldFormulario>

      <FieldFormulario>
        <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
          Multimedia
        </Text>
        <GalleryMultiImages
          field="multimedia"
          setFieldValue={setFieldValue}
          values={values.multimedia}
          allowedFiles={['image/*', 'application/pdf', 'video/*']}
          icon={require('../../../../assets/multimedia.png')}
          placeholder="Puedes agregar imágenes / videos / audios o archivos"
        />
      </FieldFormulario>

      <FieldFormulario>
        <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
          Audios
        </Text>
        <CreatableAudioRecord
          field="audios"
          setField={addAudio}
          values={values.audios}
          deleteValue={deleteAudio}
        />
      </FieldFormulario>

      {isSubmiting ? (
        <Spinner />
      ) : (
        <View style={tw`flex flex-row justify-center items-center my-6`}>
          <SecondaryButton
            label={isEdit ? 'Guardar' : 'Publicar'}
            handleClick={handleSubmit}
            style={`${BACKGROUND_COLORS.ORANGE} w-48 shadow-sm`}
          />
        </View>
      )}
    </>
  )
}

export default PublicacionContenidoFormulario
