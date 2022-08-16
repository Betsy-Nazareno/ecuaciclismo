import tw from 'twrnc'
import * as React from 'react'
import { View, Image } from 'react-native'
import { MIME_TYPES } from '../../utils/constants'
import { ResizeMode } from 'expo-av'
import Gap from '../atomos/Gap'
import VideoPlayer from 'expo-video-player'
import CancelButton from '../atomos/CancelButton'
import PreviewPdf from '../moleculas/PreviewPdf'

interface PreviewDocumentsProps {
  values: any
  handleDelete: (uri: string) => void
}

const PreviewDocuments = ({ values, handleDelete }: PreviewDocumentsProps) => {
  const handleClick = (name: string) => {
    const multimedia = [...values]
    const fileClicked =
      multimedia.find((file) => {
        const fileUri = file.uri || file.link
        return fileUri === name
      }) || []
    const uriDelete = fileClicked.uri || fileClicked.link
    handleDelete(uriDelete)
  }

  const renderPreview = (file: any) => {
    const typeFile = file.mimeType?.split('/')[0] || file.tipo
    const uri = file.uri || file.link
    switch (typeFile) {
      case MIME_TYPES.IMAGEN:
      case MIME_TYPES.IMAGE:
        return (
          <Image
            key={uri}
            source={{ uri }}
            style={{ width: 100, height: 100 }}
          />
        )
      case MIME_TYPES.VIDEO:
        return (
          <VideoPlayer
            key={uri}
            style={{ width: 100, height: 100 }}
            slider={{ visible: false }}
            videoProps={{
              source: { uri },
              resizeMode: 'cover' as ResizeMode,
              isLooping: true,
            }}
          />
        )
      case MIME_TYPES.PDF:
        return <PreviewPdf key={uri} />
      default:
        return null
    }
  }

  return (
    <View style={tw`flex flex-row flex-wrap`}>
      {values.map((file: any) => {
        if (file.tipo === 'audio') {
          return null
        }
        const uri = file.uri || file.link
        return (
          <Gap px="2" py="2" styles="relative" key={uri}>
            {renderPreview(file)}
            <CancelButton
              styles="-right-3"
              size={20}
              handleClick={handleClick}
              value={uri}
            />
          </Gap>
        )
      })}
    </View>
  )
}

export default PreviewDocuments
