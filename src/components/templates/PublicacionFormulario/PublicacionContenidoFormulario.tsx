import { useFormikContext } from 'formik'
import * as React from 'react'
import { Text } from 'react-native'
import { Publicacion } from '../../../models/Publicaciones.model'
import {
  BACKGROUND_COLORS,
  etiquetasPublicaciones,
  TEXT_COLORS,
} from '../../../utils/constants'
import Input from '../../moleculas/Input'
import SecondaryButton from '../../atomos/SecondaryButton'
import FieldFormulario from '../../moleculas/FieldFormulario'
import tw from 'twrnc'
import SelectCreatableBatches from '../../moleculas/SelectCreatableBatches'

interface PublicacionContenidoFormularioProps {
  page: number
  setPage: (value: number) => void
}

const PublicacionContenidoFormulario = ({
  page,
  setPage,
}: PublicacionContenidoFormularioProps) => {
  const { values, setFieldValue } = useFormikContext<Publicacion>()

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

  if (page !== 1) {
    return null
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
        />
      </FieldFormulario>

      <FieldFormulario>
        <Input
          multiline
          numberOfLines={6}
          text="Descripción"
          type="none"
          name="descripcion"
          value={values.titulo}
          textAlignVertical="top"
          stylesInput="pt-2"
          setValue={(value) => setFieldValue('descripcion', value)}
          placeholder="Agrega una descripción..."
        />
      </FieldFormulario>
      <SecondaryButton
        label="Continuar >"
        handleClick={() => setPage(2)}
        style={`${BACKGROUND_COLORS.ORANGE} w-6/12 mx-auto mt-6`}
      />
    </>
  )
}

export default PublicacionContenidoFormulario
