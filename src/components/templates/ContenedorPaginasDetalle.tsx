import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import tw from 'twrnc'

interface ContenedorPaginasDetalleProps {
  borderRight?: boolean
  children: React.ReactNode | React.ReactNode[]
  colorBorder: string
  borderWidth: number
  styleProps?: string
}

const ContenedorPaginasDetalle = ({
  borderRight,
  children,
  colorBorder,
  borderWidth,
  styleProps,
}: ContenedorPaginasDetalleProps) => {
  return (
    <View
      style={[
        tw`bg-white mt-4 py-2 px-3 ${styleProps || ''}`,
        borderRight
          ? {
              ...styles.borderSide,
              borderRightColor: colorBorder,
              borderRightWidth: borderWidth,
            }
          : styles.container,
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
    borderBottomColor: '#DFDFF0',
    borderBottomWidth: 1,
    borderLeftColor: '#DFDFF0',
    borderLeftWidth: 1,
    borderTopColor: '#DFDFF0',
    borderTopWidth: 1,
    borderRadius: 14,
  },
})
