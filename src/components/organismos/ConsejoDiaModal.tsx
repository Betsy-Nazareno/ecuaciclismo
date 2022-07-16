import * as React from 'react'
import { Text, View, Modal, Pressable } from 'react-native'
import tw from 'twrnc'
import { BORDER_COLORS, TEXT_COLORS } from '../../utils/constants'
import Ruler from '../atomos/Ruler'

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
        style={tw`flex items-center justify-center h-full bg-black bg-opacity-20`}
      >
        <View style={tw`p-4 bg-white rounded-2xl w-11/12`}>
          <View style={tw`flex flex-row justify-between pb-2 pl-2`}>
            <Text
              style={tw`text-2xl text-center font-bold w-11/12 ${TEXT_COLORS.PRIMARY_BLUE}`}
            >
              Consejo del día
            </Text>
            <Pressable onPress={() => setVisible(!visible)}>
              <View style={tw`-mt-2 pr-3`}>
                <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-2xl`}>
                  x
                </Text>
              </View>
            </Pressable>
          </View>
          <Ruler style={BORDER_COLORS.GRAY} />
        </View>
      </View>
    </Modal>
  )
}

export default ConsejoDiaModal
