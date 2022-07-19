import * as React from 'react'
import { View, Image, Pressable } from 'react-native'
import tw from 'twrnc'
import { SelectPickerValues } from '../../models/Etiqueta.model'
import {
  BACKGROUND_COLORS,
  etiquetasPublicaciones,
} from '../../utils/constants'
import Gap from '../atomos/Gap'
import SelectInput from '../atomos/SelectInput'
import Badge from './Badge'

interface SelectCreatableBatchesProps {
  values: SelectPickerValues[]
  selectedValues: string[]
  deleteValue: (value: string) => void
  setValuesSelected: (value: string) => void
}

const SelectCreatableBatches = ({
  values,
  selectedValues,
  setValuesSelected,
  deleteValue,
}: SelectCreatableBatchesProps) => {
  const renderBadge = (value: string) => {
    const badge = etiquetasPublicaciones.find(
      (etiqueta) => etiqueta.value === value
    )
    const { value: valor, label } = badge || {}
    return (
      <Gap px="1" py="1">
        <View style={tw`relative`}>
          <Badge
            key={valor}
            name={valor || ''}
            label={label || ''}
            backgroundColor={BACKGROUND_COLORS.ORANGE}
          />
          <Pressable
            onPress={() => deleteValue(valor || '')}
            style={tw`absolute -top-1 -right-5 w-8`}
          >
            <Image
              source={require('../../../assets/cancel_icon.png')}
              style={{ width: 15, height: 15 }}
            />
          </Pressable>
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
    </View>
  )
}

export default SelectCreatableBatches
