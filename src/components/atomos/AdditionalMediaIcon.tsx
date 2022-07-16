import * as React from 'react'
import { Image } from 'react-native'

const AdditionalMediaIcon = () => {
  return (
    <Image
      source={require('../../../assets/additional_audio_icon.png')}
      style={{ width: 20, height: 20 }}
    />
  )
}

export default AdditionalMediaIcon
