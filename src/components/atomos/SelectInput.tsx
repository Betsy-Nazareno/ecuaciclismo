import * as React from 'react'
import { Picker } from '@react-native-picker/picker'
import { Etiqueta } from '../../models/Etiqueta.model'

interface SelectInputProps {
  values: Etiqueta[]
  placeholder: string
  setValuesSelected: (value: string) => void
}

const SelectInput = ({
  values,
  setValuesSelected,
  placeholder,
}: SelectInputProps) => {
  return (
    <Picker
      onValueChange={(itemValue) => setValuesSelected(itemValue as string)}
      mode="dropdown"
    >
      <Picker.Item label={placeholder} style={{ color: '#767676' }} />
      {values.map((item) => {
        const { nombre, value } = item
        return <Picker.Item label={nombre} value={value} key={value} />
      })}
    </Picker>
  )
}

export default SelectInput
