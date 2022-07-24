import tw from 'twrnc'
import { DocumentResult } from 'expo-document-picker'
import * as React from 'react'
import { View, Image } from 'react-native'
import { MIME_TYPES } from '../../utils/constants'
import { ResizeMode } from 'expo-av'
import Gap from '../atomos/Gap'
import VideoPlayer from 'expo-video-player'
import CancelButton from '../atomos/CancelButton'
import PreviewPdf from '../moleculas/PreviewPdf'
import AudioPlay from '../moleculas/AudioPlay'

interface PreviewDocumentsProps {
  values: DocumentResult[]
  handleDelete: (file: DocumentResult) => void
}

const PreviewDocuments = ({ values, handleDelete }: PreviewDocumentsProps) => {
  const handleClick = (name: string) => {
    const fileClicked = values.find((file) => {
      if (file.type !== 'cancel') {
        return file.name === name
      }
    })
    fileClicked && handleDelete(fileClicked)
  }
  const renderPreview = (file: DocumentResult) => {
    if (file.type === 'cancel') {
      return null
    }
    const typeFile = file.mimeType?.split('/')[0]
    const { name, uri } = file
    switch (typeFile) {
      case MIME_TYPES.IMAGE:
        return (
          <Image
            key={name || uri}
            source={{ uri }}
            style={{ width: 100, height: 100 }}
          />
        )
      case MIME_TYPES.VIDEO:
        return (
          <VideoPlayer
            key={name}
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
        return <PreviewPdf key={name} name={name} />
      case MIME_TYPES.AUDIO:
        return <AudioPlay key={name || uri} source={file} />
    }
  }

  return (
    <View style={tw`flex flex-row flex-wrap`}>
      {values.map((file) => {
        if (file.type === 'cancel') {
          return null
        }
        return (
          <Gap px="2" py="2" styles="relative" key={file.uri}>
            {renderPreview(file)}
            <CancelButton
              styles="-right-3"
              size={20}
              handleClick={handleClick}
              value={file.name}
            />
          </Gap>
        )
      })}
    </View>
  )
}

export default PreviewDocuments
