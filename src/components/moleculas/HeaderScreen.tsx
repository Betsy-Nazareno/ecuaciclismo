import * as React from 'react'
import { View, ImageSourcePropType, StyleSheet, Image } from 'react-native'
import tw from 'twrnc'
import { TEXT_COLORS } from '../../utils/constants'
import { CustomText } from '../atomos/CustomText'

interface HeaderScreenProps {
  title: string
  message?: string
  srcImage?: ImageSourcePropType
}

const HeaderScreen = ({ title, message, srcImage }: HeaderScreenProps) => {
  return (
    <View
      style={[tw`bg-white rounded-b-3xl mx-[1px] py-4`, styles.borderContainer]}
    >
      <View style={tw`flex flex-row justify-center items-center `}>
        {srcImage && (
          <View style={tw`pr-4`}>
            <Image source={srcImage} style={{ width: 50, height: 50 }} />
          </View>
        )}
        <CustomText style={`text-2xl font-extrabold ${TEXT_COLORS.DARK_BLUE}`}>
          {title}
        </CustomText>
      </View>
      <View style={tw`mt-2`}>
        <CustomText
          containerProps={{ textAlign: 'center' }}
          style={`text-center text-xs font-medium ${TEXT_COLORS.DARK_GRAY}`}
        >
          {message || ''}
        </CustomText>
      </View>
    </View>
  )
}

export default HeaderScreen

const styles = StyleSheet.create({
  borderContainer: {
    borderWidth: 1,
    borderColor: '#DFDFF0',
    borderStyle: 'solid',
  },
})
