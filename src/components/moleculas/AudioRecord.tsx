import * as React from 'react'
import {
  View,
  StyleSheet,
  Vibration,
  Image,
  Pressable,
  StyleProp,
  TextStyle,
} from 'react-native'
import { Audio } from 'expo-av'
import tw from 'twrnc'
import { BACKGROUND_COLORS, TEXT_COLORS } from '../../utils/constants'
import { CustomText } from '../atomos/CustomText'

interface AudioRecordProps {
  field: string
  setField: (audio: Audio.Recording) => void
}

const AudioRecord = ({ setField }: AudioRecordProps) => {
  const [recording, setRecording] = React.useState<Audio.Recording>()

  async function startRecording() {
    Vibration.vibrate(100)
    try {
      await Audio.requestPermissionsAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      )
      setRecording(recording)
    } catch (err) {
      console.error('Failed to start recording', err)
    }
  }

  async function stopRecording() {
    Vibration.vibrate(100)
    setRecording(undefined)
    await recording?.stopAndUnloadAsync()
    recording && setField(recording)
  }

  return (
    <View style={recording ? styles.containerFocus : styles.containerUnfocus}>
      <View style={tw`relative py-2 `}>
        <View style={tw`flex flex-row justify-center`}>
          {recording && (
            <View
              style={tw`mr-2 mt-[1%] rounded-full h-2 w-2 ${BACKGROUND_COLORS.ORANGE}`}
            />
          )}
          <CustomText
            style={`${TEXT_COLORS.DARK_GRAY} text-xs`}
            containerProps={{ textAlign: 'center' }}
          >
            {recording ? 'Grabando...' : 'Pulsa para grabar'}
          </CustomText>
        </View>
        <Pressable
          style={tw`absolute right-0 ${recording ? '-top-3' : '-top-1'}`}
          onLongPress={startRecording}
          onPressOut={stopRecording}
        >
          <Image
            source={require('../../../assets/button_audio_icon.png')}
            style={{ width: recording ? 60 : 40, height: recording ? 60 : 40 }}
          />
        </Pressable>
      </View>
    </View>
  )
}

export default AudioRecord

const borderContainer: StyleProp<TextStyle> = {
  borderWidth: 1,
  borderColor: '#DFDFF0',
  borderStyle: 'solid',
  borderRadius: 200,
}

const styles = StyleSheet.create({
  containerFocus: {
    ...borderContainer,
    borderColor: '#2D84C4',
    backgroundColor: '#F2FAFF',
  },
  containerUnfocus: {
    ...borderContainer,
    borderColor: '#DFDFDF',
  },
})
