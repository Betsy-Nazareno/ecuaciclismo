import * as React from 'react'
import tw from 'twrnc'
import { View, Image } from 'react-native'
import { TEXT_COLORS } from '../../utils/constants'
import { CustomText } from '../atomos/CustomText'

interface WithoutResultsProps {
  styles: string
  dimension?: number
}

const WithoutResults = ({ styles, dimension = 250 }: WithoutResultsProps) => {
  return (
    <View style={tw`flex flex-col items-center justify-center ${styles}`}>
      <Image
        source={require('../../../assets/explorer.png')}
        style={{ width: dimension, height: dimension, opacity: 0.5 }}
      />
      <View style={tw`w-8/12 mt-4`}>
        <CustomText
          style={`${TEXT_COLORS.GRAY_PLACEHOLDER}`}
          containerProps={{ textAlign: 'center' }}
        >
          ¡Vaya! parece que no encontramos nada aquí
        </CustomText>
      </View>
    </View>
  )
}

export default WithoutResults
