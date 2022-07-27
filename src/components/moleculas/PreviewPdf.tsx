import * as React from 'react'
import tw from 'twrnc'
import { View, Image } from 'react-native'

const PreviewPdf = () => {
  return (
    <View>
      <Image
        source={require('../../../assets/pdf_icon.png')}
        style={{ width: 86, height: 86, marginBottom: 1 }}
      />
      <View style={tw`w-20 pl-4`}></View>
    </View>
  )
}

export default PreviewPdf
