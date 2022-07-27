import * as React from 'react'
import tw from 'twrnc'
import { View } from 'react-native'
import AudioRecord from '../moleculas/AudioRecord'
import { Audio } from 'expo-av'
import NoteVoice from '../moleculas/NoteVoice'
import CancelButton from '../atomos/CancelButton'
import { WIDTH_DIMENSIONS } from '../../utils/constants'

interface CreatableAudioRecordProps {
  field: string
  values: any
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
      {values.map((record: any) => {
        return (
          <View style={tw`relative`} key={record._uri || record.link}>
            <NoteVoice record={record} width={WIDTH_DIMENSIONS * 0.8} />
            <CancelButton
              value={record._uri || record.link}
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
