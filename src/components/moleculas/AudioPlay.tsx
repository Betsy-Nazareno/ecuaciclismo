import * as React from 'react'
import { View, Image, Pressable } from 'react-native'
import { Audio } from 'expo-av'
import tw from 'twrnc'

interface AudioPlayProps {
  source: any
}

const AudioPlay = ({ source }: AudioPlayProps) => {
  const [sound, setSound] = React.useState<Audio.Sound>()
  const [isPlaying, setIsPlaying] = React.useState(false)

  async function playSound() {
    const uri = source.uri || source.link
    const { sound } = await Audio.Sound.createAsync({ uri })
    setSound(sound)
    await sound.playAsync()
    setIsPlaying(true)
  }

  const pauseSound = async () => {
    await sound?.pauseAsync()
    setIsPlaying(false)
  }

  const handleSound = async () => {
    isPlaying ? pauseSound() : playSound()
  }

  const icon = isPlaying
    ? require('../../../assets/pause_icon.png')
    : require('../../../assets/play_icon.png')

  return (
    <View style={tw`flex flex-col items-center justify-center`}>
      <View
        style={[
          tw`flex flex-row items-center justify-center mb-1`,
          { width: 80, height: 80 },
        ]}
      >
        <Pressable onPress={handleSound}>
          <Image
            source={icon}
            style={{
              width: 60,
              height: 60,
              borderRadius: 10 / 2,
            }}
          />
        </Pressable>
      </View>
    </View>
  )
}

export default AudioPlay
