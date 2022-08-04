import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TEXT_COLORS } from '../../utils/constants'
import { CustomText } from './CustomText'

interface ViewMoreRoundedProps {
  label: string
  dimension?: number
}

const ViewMoreRounded = ({ label, dimension = 40 }: ViewMoreRoundedProps) => {
  const textSize = dimension < 40 ? 'text-xs' : 'text-base'
  return (
    <View
      style={{
        width: dimension,
        height: dimension,
        borderRadius: 100 / 2,
        marginLeft: -10,
        backgroundColor: '#e6e6e6',
      }}
    >
      <CustomText
        style={`${TEXT_COLORS.DARK_BLUE} font-bold ${textSize}`}
        containerProps={{
          marginTop: 5,
          textAlign: 'center',
        }}
      >
        {label}
      </CustomText>
    </View>
  )
}

export default ViewMoreRounded
