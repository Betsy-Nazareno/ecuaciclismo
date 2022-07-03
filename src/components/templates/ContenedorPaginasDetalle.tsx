import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import tw from 'twrnc'

interface ContenedorPaginasDetalleProps {
  borderRight?: boolean
  children: React.ReactNode | React.ReactNode[]
}

const ContenedorPaginasDetalle = ({
  borderRight,
  children,
}: ContenedorPaginasDetalleProps) => {
  // const borderRightClass = borderRight? "border-l-8 "
  return (
    <View
      style={[
        tw`bg-white mt-4 py-2 px-3`,
        borderRight ? styles.borderSide : styles.container,
      ]}
    >
      {children}
    </View>
  )
}

export default ContenedorPaginasDetalle

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#DFDFF0',
    borderStyle: 'solid',
    borderRadius: 14,
  },
  borderSide: {
    borderRightColor: '#F16F31',
    borderRightWidth: 12,
    borderBottomColor: '#DFDFF0',
    borderBottomWidth: 1,
    borderLeftColor: '#DFDFF0',
    borderLeftWidth: 1,
    borderTopColor: '#DFDFF0',
    borderTopWidth: 1,
    borderRadius: 14,
  },
})
