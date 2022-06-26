import * as React from 'react'
import {
  Text,
  View,
  ImageSourcePropType,
  StyleSheet,
  Image,
} from 'react-native'
import tw from 'twrnc'
import { TEXT_COLORS } from '../../../utils/constants'

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
      <View style={tw`flex flex-row justify-center items-center`}>
        {srcImage && (
          <View style={tw`pr-4`}>
            <Image source={srcImage} style={{ width: 50, height: 50 }} />
          </View>
        )}
        <View style={tw`w-6/12`}>
          <Text style={tw`text-2xl font-bold ${TEXT_COLORS.DARK_BLUE}`}>
            {title}
          </Text>
        </View>
      </View>
      <View style={tw`mt-2`}>
        <Text
          style={tw`text-center text-sm font-medium ${TEXT_COLORS.DARK_GRAY}`}
        >
          {message}
        </Text>
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
