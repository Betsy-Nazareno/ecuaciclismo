import { ErrorMessage } from 'formik'
import * as React from 'react'
import { View } from 'react-native'
import tw from 'twrnc'
import { Etiqueta } from '../../models/Etiqueta.model'
import { BACKGROUND_COLORS } from '../../utils/constants'
import CancelButton from '../atomos/CancelButton'
import { FieldError } from '../atomos/FieldError'
import Gap from '../atomos/Gap'
import SelectInput from '../atomos/SelectInput'
import Badge from './Badge'

interface SelectCreatableBatchesProps {
  values: Etiqueta[]
  selectedValues: string[]
  placeholder: string
  deleteValue: (value: string) => void
  setValuesSelected: (value: string) => void
  field: string
}

const SelectCreatableBatches = ({
  field,
  values,
  selectedValues,
  placeholder,
  setValuesSelected,
  deleteValue,
}: SelectCreatableBatchesProps) => {
  const renderBadge = (value: string) => {
    const badge = values.find((etiqueta) => etiqueta.value === value)
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
    <>
      <View style={tw`flex flex-row flex-wrap my-2`}>
        {selectedValues.map((value) => renderBadge(value))}
      </View>
      <SelectInput
        values={values}
        setValuesSelected={setValuesSelected}
        placeholder={placeholder}
      />
      <ErrorMessage name={field} render={FieldError} />
    </>
  )
}

export default SelectCreatableBatches
