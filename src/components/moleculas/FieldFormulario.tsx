import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import tw from 'twrnc'

interface FieldFormularioProps {
  children: React.ReactNode
}

const FieldFormulario = ({ children }: FieldFormularioProps) => {
  return (
    <View
      style={[tw`bg-white py-4 px-2 mx-[1px] mt-3`, styles.borderContainer]}
    >
      {children}
    </View>
  )
}

export default FieldFormulario

const styles = StyleSheet.create({
  borderContainer: {
    borderWidth: 1,
    borderColor: '#DFDFF0',
    borderStyle: 'solid',
    borderRadius: 10,
  },
})
