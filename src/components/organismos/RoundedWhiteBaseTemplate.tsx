import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import tw from 'twrnc'

interface RoundedWhiteBaseTemplateProps {
  children: React.ReactNode | React.ReactNode[]
  shadow?: boolean
  label?: string
}

const RoundedWhiteBaseTemplate = ({
  children,
  label,
  shadow = true,
}: RoundedWhiteBaseTemplateProps) => {
  return (
    <View accessibilityLabel={label} style={styles.borderContainer}>
      <View
        style={tw`bg-white py-2 px-4 rounded-xl ${shadow ? 'shadow-xl' : ''}`}
      >
        {children}
      </View>
    </View>
  )
}

export default RoundedWhiteBaseTemplate

const styles = StyleSheet.create({
  borderContainer: {
    borderWidth: 1,
    borderColor: '#DFDFF0',
    borderStyle: 'solid',
    borderRadius: 14,
    marginVertical: 3,
  },
})
