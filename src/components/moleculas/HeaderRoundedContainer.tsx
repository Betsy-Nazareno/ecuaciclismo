import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import tw from 'twrnc'
interface HeaderRoundedContainerProps {
  children: React.ReactNode | React.ReactNode[]
}

const HeaderRoundedContainer = ({ children }: HeaderRoundedContainerProps) => {
  return (
    <View
      style={[tw`bg-white rounded-b-3xl mx-2 py-4`, styles.borderContainer]}
    >
      {children}
    </View>
  )
}

export default HeaderRoundedContainer

const styles = StyleSheet.create({
  borderContainer: {
    borderWidth: 1,
    borderColor: '#DFDFF0',
    borderStyle: 'solid',
  },
})
