import * as React from 'react'
import { Picker } from '@react-native-picker/picker'
import { Etiqueta } from '../../models/Etiqueta.model'
import TouchableOpacity from 'react-native-gesture-handler/lib/typescript/components/touchables/TouchableOpacity'

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
      <TouchableOpacity accessibilityLabel="picker-pp">
        <Picker.Item testID='pp' label={placeholder} style={{ color: '#767676' }} />
      </TouchableOpacity>


      {values.map((item) => {
        const { nombre, value } = item
        return <TouchableOpacity key={value} accessibilityLabel={nombre}>
          <Picker.Item testID={nombre} label={nombre} value={value} key={value} />
        </TouchableOpacity>
      })}
    </Picker>
  )
}

export default SelectInput
