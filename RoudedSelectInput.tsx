import * as React from 'react'
import { Etiqueta } from './src/models/Etiqueta.model'
import SelectInput from './src/components/atomos/SelectInput'
import { View } from 'react-native'

interface RoundedSelectInputProps {
  values: Etiqueta[]
  placeholder: string
  setValuesSelected: (value: string) => void
  selectedValue?: string
}

const RoundedSelectInput = ({
  values,
  setValuesSelected,
  placeholder,
  selectedValue,
}: RoundedSelectInputProps) => {
  return (
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
        selectedValue={selectedValue}
      />
    </View>
  )
}

export default RoundedSelectInput
