import * as React from 'react'
import { View, Image, TouchableHighlight } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import tw from 'twrnc'
import { BACKGROUND_COLORS, DOCUMENT_RESULT_TYPES } from '../../utils/constants'

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
        style={tw`h-14 w-14 rounded-full flex items-center justify-center ${BACKGROUND_COLORS.PRIMARY_BLUE}`}
      >
        <Image
          source={require('../../../assets/add-photo.png')}
          style={{ width: 30, height: 30 }}
        />
      </View>
    </TouchableHighlight>
  )
}

export default RoundedGalleryButton
