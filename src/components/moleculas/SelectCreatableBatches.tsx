import { ErrorMessage } from 'formik'
import * as React from 'react'
import { View } from 'react-native'
import tw from 'twrnc'
import { SelectPickerValues } from '../../models/Etiqueta.model'
import {
  BACKGROUND_COLORS,
  etiquetasPublicaciones,
} from '../../utils/constants'
import CancelButton from '../atomos/CancelButton'
import { FieldError } from '../atomos/FieldError'
import Gap from '../atomos/Gap'
import SelectInput from '../atomos/SelectInput'
import Badge from './Badge'

interface SelectCreatableBatchesProps {
  values: SelectPickerValues[]
  selectedValues: string[]
  deleteValue: (value: string) => void
  setValuesSelected: (value: string) => void
  field: string
}

const SelectCreatableBatches = ({
  field,
  values,
  selectedValues,
  setValuesSelected,
  deleteValue,
}: SelectCreatableBatchesProps) => {
  const renderBadge = (value: string) => {
    const badge = etiquetasPublicaciones.find(
      (etiqueta) => etiqueta.value === value
    )

    const { value: valor, nombre } = badge || {}
    return (
      <Gap px="1" py="1" key={valor}>
        <View style={tw`relative`}>
          <Badge
            name={valor || ''}
            label={nombre || ''}
            backgroundColor={BACKGROUND_COLORS.ORANGE}
          />
          <CancelButton handleClick={deleteValue} value={valor || ''} />
        </View>
      </Gap>
    )
  }
  return (
    <View style={tw``}>
      <View style={tw`flex flex-row flex-wrap my-2`}>
        {selectedValues.map((value) => renderBadge(value))}
      </View>
      <SelectInput values={values} setValuesSelected={setValuesSelected} />
      <ErrorMessage name={field} render={FieldError} />
    </View>
  )
}

export default SelectCreatableBatches
