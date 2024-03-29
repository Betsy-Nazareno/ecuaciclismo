import * as React from 'react'
import tw from 'twrnc'
import { View } from 'react-native'
import SelectInput from '../atomos/SelectInput'
import { ErrorMessage } from 'formik'
import { FieldError } from '../atomos/FieldError'
import CancelButton from '../atomos/CancelButton'
import ItemCheckList from '../atomos/ItemCheckList'

interface SelectCreatableListProps {
  field: string
  placeholder: string
  values: { value: string; nombre: string }[]
  selectedValues?: string[]
  deleteValue: (value: string) => void
  setValuesSelected: (value: string) => void
}

const SelectCreatableList = ({
  field,
  values,
  selectedValues,
  setValuesSelected,
  deleteValue,
  placeholder,
}: SelectCreatableListProps) => {
  const renderItem = (value: string) => {
    const item = values.find((requisito) => requisito.value === value)
    const { value: valor, nombre } = item || {}
    if (!valor) return null
    return (
      <View key={valor}>
        <ItemCheckList text={nombre || ''} />
        <CancelButton handleClick={deleteValue} value={valor || ''} />
      </View>
    )
  }
  return (
    <View>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#e6e6e6',
          borderStyle: 'solid',
          borderRadius: 10,
        }}
      >
        <SelectInput
          values={values}
          setValuesSelected={setValuesSelected}
          placeholder={placeholder}
        />
      </View>
      <ErrorMessage name={field} render={FieldError} />
      <View style={tw`mt-2 mx-3`}>
        {selectedValues?.map((value) => renderItem(value))}
      </View>
    </View>
  )
}

export default SelectCreatableList
