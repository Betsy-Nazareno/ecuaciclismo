import * as React from 'react'
import tw from 'twrnc'
import { Text, View, Modal, Pressable } from 'react-native'
import { CustomText } from '../atomos/CustomText'
import { TEXT_COLORS } from '../../utils/constants'
import Ruler from '../atomos/Ruler'
import { ScrollView } from 'react-native-gesture-handler'
import DetalleUsuarioColaboracion from '../moleculas/DetalleUsuarioColaboracion'

interface ParticipantesRutaModalProps {
  visible: boolean
  setVisible: (visible: boolean) => void
  participantes: any
}

const ParticipantesRutaModal = ({
  visible,
  setVisible,
  participantes,
}: ParticipantesRutaModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {
        setVisible(!visible)
      }}
    >
      <View
        style={tw`flex items-center justify-center h-full bg-black bg-opacity-20`}
      >
        <View style={tw`bg-white rounded-lg p-4 w-11/12`}>
          <View style={tw`pb-2 pl-2`}>
            <CustomText style={`${TEXT_COLORS.DARK_BLUE} text-2xl`}>
              Participantes
            </CustomText>

            <Pressable
              onPress={() => setVisible(!visible)}
              style={tw`absolute -top-1 right-2`}
            >
              <View style={tw`rounded-full w-12 h-12  flex items-end`}>
                <Text style={tw`${TEXT_COLORS.DARK_GRAY} font-bold text-xl`}>
                  x
                </Text>
              </View>
            </Pressable>
          </View>

          <Ruler style="w-11/12 mx-auto" />
          <View style={tw`h-52`}>
            <ScrollView>
              {participantes.map((user: any, index: number) => (
                <DetalleUsuarioColaboracion user={user} key={index} />
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ParticipantesRutaModal
