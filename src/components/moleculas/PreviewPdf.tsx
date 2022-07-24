import * as React from 'react'
import tw from 'twrnc'
import { Text, View, Image } from 'react-native'
import { TEXT_COLORS } from '../../utils/constants'

interface PreviewPdfProps {
  name: string
}

const PreviewPdf = ({ name }: PreviewPdfProps) => {
  return (
    <View>
      <Image
        source={require('../../../assets/pdf_icon.png')}
        style={{ width: 86, height: 86, marginBottom: 1 }}
      />
      <View style={tw`w-20 pl-4`}>
        <Text
          style={tw`${TEXT_COLORS.DARK_GRAY} text-xs`}
          ellipsizeMode="middle"
          numberOfLines={1}
        >
          {name}
        </Text>
      </View>
    </View>
  )
}

export default PreviewPdf
