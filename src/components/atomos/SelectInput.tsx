import * as React from 'react'
import { Picker } from '@react-native-picker/picker'
import { Etiqueta } from '../../models/Etiqueta.model'

interface SelectInputProps {
  values: Etiqueta[]
  placeholder: string
  accessibilityLabel: string
  setValuesSelected: (value: string) => void
  selectedValue?: string
}

const SelectInput = ({
  values,
  setValuesSelected,
  placeholder,
  accessibilityLabel,
  selectedValue,
}: SelectInputProps) => {
  return (
    <Picker
      onValueChange={(itemValue) => setValuesSelected(itemValue as string)}
      mode="dropdown"
      accessibilityLabel={accessibilityLabel}
      selectedValue={selectedValue}
    >
      <Picker.Item testID='pp' label={placeholder} style={{ color: '#767676' }} />
      {values.map((item) => {
        const { nombre, value } = item
        return <Picker.Item testID={nombre} label={nombre} value={value} key={value} />
      })}
    </Picker>
  )
}

export default SelectInput
