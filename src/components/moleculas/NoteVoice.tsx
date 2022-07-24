import { Audio, AVPlaybackStatus } from 'expo-av'
import * as React from 'react'
import tw from 'twrnc'
import { View, Pressable, Image } from 'react-native'
import * as Progress from 'react-native-progress'
import { WIDTH_DIMENSIONS } from '../../utils/constants'

interface NoteVoiceProps {
  record: Audio.Recording
}

const NoteVoice = ({ record }: NoteVoiceProps) => {
  const [sound, setSound] = React.useState<Audio.Sound>()
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  const handlePlay = async () => {
    const uri = record.getURI() || ''
    const { sound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: true },
      (status: AVPlaybackStatus) => {
        if (status.isLoaded) {
          setProgress(
            (status.positionMillis || 0) / record._finalDurationMillis
          )
          if (status.didJustFinish) {
            setProgress(1)
            setIsPlaying(false)
          }
        }
      }
    )
    setSound(sound)
    await sound.playAsync()
    setIsPlaying(true)
  }
  const handlePause = async () => {
    await sound?.pauseAsync()

    setIsPlaying(false)
  }

  const controlButton = isPlaying
    ? require('../../../assets/pausa_record_icon.png')
    : require('../../../assets/play_record_icon.png')
  return (
    <View style={tw`relative my-4`}>
      <Pressable
        onPress={isPlaying ? handlePause : handlePlay}
        style={tw`absolute -top-3 z-40`}
      >
        <Image
          source={controlButton}
          style={{
            width: 30,
            height: 30,
            backgroundColor: '#fff',
            borderRadius: 100 / 2,
          }}
        />
      </Pressable>
      <Progress.Bar
        progress={progress}
        width={WIDTH_DIMENSIONS * 0.8}
        color={'#F16F31'}
        unfilledColor={'#e6e6e6'}
        borderColor="#fff"
      />
    </View>
  )
}

export default NoteVoice
