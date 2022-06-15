import * as React from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import tw from 'twrnc'
import { TextInputType } from '../../../models/TextInput'

interface InputProps {
  text?: string
  type: TextInputType
  placeholder?: string
  stylesProp?: string
  value?: string
  setValue?: (value: string) => void
}

const Input = ({ text, type, placeholder, stylesProp }: InputProps) => {
  return (
    <View style={tw`${stylesProp || ''}`}>
      {text && <Text style={tw`text-[#0C3248]`}>{text}</Text>}
      <TextInput
        style={styles.container}
        textContentType={type}
        placeholder={placeholder}
      />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#2D84C4',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontSize: 16,
    marginTop: 2,
  },
})
