import { Audio, AVPlaybackStatus } from 'expo-av'
import * as React from 'react'
import tw from 'twrnc'
import { View, Pressable, Image } from 'react-native'
import * as Progress from 'react-native-progress'

interface NoteVoiceProps {
  record?: Audio.Recording
  uriRecord?: string
  width: number
}

const NoteVoice = ({ record, uriRecord, width }: NoteVoiceProps) => {
  const [sound, setSound] = React.useState<Audio.Sound>()
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  const handlePlay = async () => {
    const uri = record ? record.getURI() : uriRecord
    const { sound } = await Audio.Sound.createAsync(
      { uri: uri as string },
      { shouldPlay: true },
      (status: AVPlaybackStatus) => {
        if (status.isLoaded) {
          setProgress(
            (status.positionMillis || 0) / (status.durationMillis || 1)
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
        width={width}
        color={'#F16F31'}
        unfilledColor={'#e6e6e6'}
        borderColor="#fff"
      />
    </View>
  )
}

export default NoteVoice
