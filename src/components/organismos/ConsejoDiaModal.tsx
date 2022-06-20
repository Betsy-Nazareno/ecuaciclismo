import * as React from 'react'
import { Text, View, Modal } from 'react-native'
import tw from 'twrnc'
import ButtonPrimary from '../atomos/ButtonPrimary'

interface ConsejoDiaModalProps {
  visible: boolean
  setVisible: (visible: boolean) => void
}

const ConsejoDiaModal = ({ visible, setVisible }: ConsejoDiaModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={() => {
        setVisible(!visible)
      }}
    >
      <View
        style={tw`flex items-center justify-center h-full bg-[#000] bg-opacity-20`}
      >
        <View style={tw`px-10 py-10 bg-white rounded-2xl`}>
          <Text style={tw``}>Hello World!</Text>
          <ButtonPrimary
            label="Publicar"
            handleClick={() => setVisible(!visible)}
          />
        </View>
      </View>
    </Modal>
  )
}

export default ConsejoDiaModal
