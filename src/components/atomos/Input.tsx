import { useFormikContext } from 'formik'
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
import { TextInputType } from '../../../models/TextInput.model'
import { Login } from '../../../models/User'

interface InputProps {
  text?: string
  name: string
  type: TextInputType
  placeholder?: string
  stylesProp?: string
  value?: string
  setValue?: (value: string) => void
}

const Input = ({ text, type, placeholder, stylesProp, name }: InputProps) => {
  const [isFocus, setIsFocus] = React.useState(false)

  const { values, setFieldValue } = useFormikContext<Login>()
  return (
    <View style={tw`${stylesProp || ''}`}>
      {text && <Text style={tw`text-[#0C3248]`}>{text}</Text>}
      <TextInput
        style={isFocus ? styles.containerFocus : styles.containerUnfocus}
        textContentType={type}
        placeholder={placeholder}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(!isFocus)}
        onChangeText={(value) => setFieldValue(name, value)}
        value={values[name as keyof Login]}
      />
    </View>
  )
}

export default Input

const container: StyleProp<TextStyle> = {
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: 10,
  paddingHorizontal: 10,
  paddingVertical: 6,
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
