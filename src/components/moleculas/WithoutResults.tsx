import * as React from 'react'
import tw from 'twrnc'
import { View, Image } from 'react-native'
import { TEXT_COLORS } from '../../utils/constants'
import { CustomText } from '../atomos/CustomText'

const WithoutResults = () => {
  return (
    <View style={tw`pt-12 flex flex-col items-center justify-center`}>
      <Image
        source={require('../../../assets/explorer.png')}
        style={{ width: 250, height: 250, opacity: 0.5 }}
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
