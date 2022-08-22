import * as React from 'react'
import tw from 'twrnc'
import { Text, View } from 'react-native'
import FieldFormulario from '../../moleculas/FieldFormulario'
import { BACKGROUND_COLORS, TEXT_COLORS } from '../../../utils/constants'
import Input from '../../moleculas/Input'
import { Etiqueta } from '../../../models/Etiqueta.model'
import { Formik, FormikHelpers, useFormikContext } from 'formik'
import { GrupoEncuentro, Ruta } from '../../../models/Rutas'
import ButtonPrimary from '../../atomos/ButtonPrimary'
import ItemCheckList from '../../atomos/ItemCheckList'
import CancelButton from '../../atomos/CancelButton'
import RoundedSelectInput from '../../../../RoudedSelectInput'

interface FormularioRutasGruposProps {
  grupos: Etiqueta[]
  field: string
}

const FormularioRutasGrupos = ({
  grupos,
  field,
}: FormularioRutasGruposProps) => {
  const {
    values: { grupos_encuentro },
    setFieldValue,
  } = useFormikContext<Ruta>()

  const handleSubmit = (
    props: GrupoEncuentro,
    { resetForm }: FormikHelpers<GrupoEncuentro>
  ) => {
    const alreadyExist = grupos_encuentro?.find(
      (grupoEncuentro) => grupoEncuentro.grupo === props?.grupo
    )
    if (!alreadyExist) {
      setFieldValue(field, [...(grupos_encuentro || []), props])
    }
    resetForm()
  }

  const removeGrupo = (tokenGrupo: string) => {
    setFieldValue(field, [
      ...(grupos_encuentro || []).filter((m) => m.grupo !== tokenGrupo),
    ])
  }

  const renderGrupos = () => {
    return grupos_encuentro?.map((grupo) => {
      const nombreGupo = grupos.find(
        (grupoEncuentro) => grupoEncuentro.value === grupo.grupo
      )
      return (
        <View key={grupo.grupo} style={tw`px-4`}>
          <ItemCheckList
            text={`${nombreGupo?.nombre}: ${grupo.lugar_encuentro}` || ''}
          />
          <CancelButton
            handleClick={() => removeGrupo(grupo.grupo)}
            value={grupo.grupo || ''}
            styles="right-0 top-1 w-10 h-10"
          />
        </View>
      )
    })
  }

  return (
    <FieldFormulario>
      <Formik<GrupoEncuentro>
        initialValues={{
          grupo: '',
          lugar_encuentro: '',
        }}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {(props: any) => (
          <>
            <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
              Puntos de Encuentro
            </Text>

            <Text
              style={tw`${TEXT_COLORS.DARK_BLUE} font-normal text-sm pl-2 mt-4`}
            >
              Grupos
            </Text>
            <RoundedSelectInput
              values={grupos}
              setValuesSelected={(value) =>
                props?.setFieldValue('grupo', value)
              }
              placeholder="Grupo Norte, Grupo Sur..."
              selectedValue={props?.values.grupo}
            />
            <Text
              style={tw`${TEXT_COLORS.DARK_BLUE} font-normal text-sm pl-2 mt-4`}
            >
              Lugar
            </Text>
            <Input
              type="none"
              name="lugar_encuentro"
              placeholder="Lugar de encuentro..."
              value={props?.values.lugar_encuentro}
              setValue={(value) =>
                props?.setFieldValue('lugar_encuentro', value)
              }
            />
            <View style={tw`mt-4 mb-2 w-5/12 mx-auto`}>
              <ButtonPrimary
                label="Agregar"
                handleClick={props?.submitForm}
                style={`${BACKGROUND_COLORS.DARK_BLUE} text-white rounded-3xl py-1 `}
              />
            </View>
          </>
        )}
      </Formik>
      {renderGrupos()}
    </FieldFormulario>
  )
}

export default FormularioRutasGrupos
