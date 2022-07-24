import * as React from 'react'
import tw from 'twrnc'
import { View } from 'react-native'
import AudioRecord from '../moleculas/AudioRecord'
import { Audio } from 'expo-av'
import NoteVoice from '../moleculas/NoteVoice'
import CancelButton from '../atomos/CancelButton'

interface CreatableAudioRecordProps {
  field: string
  values: Audio.Recording[]
  setField: (audio: Audio.Recording) => void
  deleteValue: (uri: string) => void
}

const CreatableAudioRecord = ({
  field,
  values,
  setField,
  deleteValue,
}: CreatableAudioRecordProps) => {
  return (
    <View style={tw`mt-2`}>
      {values.map((record) => {
        return (
          <View style={tw`relative`} key={record._uri}>
            <NoteVoice record={record} />
            <CancelButton
              value={record._uri || ''}
              handleClick={deleteValue}
              styles="top-3 right-1"
              size={19}
            />
          </View>
        )
      })}
      <View style={tw`mt-2`}>
        <AudioRecord field={field} setField={setField} />
      </View>
    </View>
  )
}

export default CreatableAudioRecord
