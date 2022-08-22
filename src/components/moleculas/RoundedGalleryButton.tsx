import * as React from 'react'
import { View, Image, TouchableHighlight } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import tw from 'twrnc'
import { DOCUMENT_RESULT_TYPES } from '../../utils/constants'

interface RoundedGalleryButtonProps {
  handleImage: (file: DocumentPicker.DocumentResult) => void
}

const RoundedGalleryButton = ({ handleImage }: RoundedGalleryButtonProps) => {
  const getFile = async () => {
    const file = await DocumentPicker.getDocumentAsync({ type: ['image/*'] })
    if (file?.type !== DOCUMENT_RESULT_TYPES?.CANCEL) {
      handleImage(file)
    }
  }

  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#E7F5FF"
      onPress={getFile}
      style={{ borderRadius: 100 / 2 }}
    >
      <View
        style={tw`h-16 w-16 rounded-full flex items-center justify-center bg-gray-400`}
      >
        <Image
          source={require('../../../assets/add-photo.png')}
          style={{ width: 35, height: 35 }}
        />
      </View>
    </TouchableHighlight>
  )
}

export default RoundedGalleryButton
