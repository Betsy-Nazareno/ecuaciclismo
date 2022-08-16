import { ErrorMessage } from 'formik'
import * as React from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  StyleProp,
  TextStyle,
} from 'react-native'
import tw from 'twrnc'
import { TextInputType } from '../../models/TextInput.model'
import { TEXT_COLORS } from '../../utils/constants'
import { FieldError } from '../atomos/FieldError'

interface InputProps {
  text?: string
  name?: string
  type: TextInputType
  multiline?: boolean
  numberOfLines?: number
  placeholder?: string
  stylesProp?: string
  stylesInput?: string
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center' | undefined
  value?: string | number
  setValue?: (value: string) => void
}

const Input = ({
  text,
  type,
  placeholder,
  stylesProp,
  name,
  multiline = false,
  numberOfLines = 1,
  textAlignVertical = 'center',
  stylesInput,
  value,
  setValue,
}: InputProps) => {
  const [isFocus, setIsFocus] = React.useState(false)

  return (
    <View style={tw`${stylesProp || ''}`}>
      {text && (
        <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
          {text}
        </Text>
      )}
      <View style={tw`mt-1`}>
        <TextInput
          style={[
            isFocus ? styles.containerFocus : styles.containerUnfocus,
            tw`${stylesInput || ''}`,
          ]}
          textAlignVertical={textAlignVertical}
          textContentType={type}
          placeholder={placeholder}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(!isFocus)}
          onChangeText={(value) => setValue?.(value)}
          multiline={multiline}
          numberOfLines={numberOfLines}
          value={value ? `${value}` : ''}
        />
      </View>
      {name && <ErrorMessage name={name} render={FieldError} />}
    </View>
  )
}

export default Input

const container: StyleProp<TextStyle> = {
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: 10,
  paddingHorizontal: 10,
  paddingVertical: 10,
  fontSize: 16,
  marginTop: 2,
}
const styles = StyleSheet.create({
  containerFocus: {
    ...container,
    borderColor: '#2D84C4',
  },
  containerUnfocus: {
    ...container,
    borderColor: '#DFDFDF',
  },
})
