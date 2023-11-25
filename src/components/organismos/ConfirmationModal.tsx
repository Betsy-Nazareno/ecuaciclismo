import * as React from 'react'
import { Text, View, Modal, Pressable } from 'react-native'
import tw from 'twrnc'
import {
  BACKGROUND_COLORS,
  BORDER_COLORS,
  TEXT_COLORS,
} from '../../utils/constants'
import ButtonPrimary from '../atomos/ButtonPrimary'
import Ruler from '../atomos/Ruler'
import UnfocusButton from '../atomos/UnfocusButton'
import Input from '../moleculas/Input'

interface ConfirmationModalProps {
  visible: boolean
  setVisible: (visible: boolean) => void
  setConfirmation: (value: boolean) => void
  title: string
  body: string
  motivo?: string
  setMotivo?: (text: string) => void
  labelId: string
}

const ConfirmationModal = ({
  visible,
  title,
  body,
  setVisible,
  setConfirmation,
  motivo,
  setMotivo,
  labelId
}: ConfirmationModalProps) => {
  return (
    <Modal
      visible={visible}
      accessibilityLabel={labelId}
      transparent={true}
      animationType="fade"
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
              style={tw`text-lg text-center font-bold w-11/12 ${TEXT_COLORS.PRIMARY_BLUE}`}
            >
              {title}
            </Text>
            <Pressable
              onPress={() => setVisible(!visible)}
              style={tw`-mt-2 pr-3`}
            >
              <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-2xl`}>
                x
              </Text>
            </Pressable>
          </View>
          <Ruler style={BORDER_COLORS.GRAY} />
          <View style={tw`py-6`}>
            <Text style={tw`text-sm mx-auto w-11/12 ${TEXT_COLORS.DARK_BLUE}`}>
              {body}
            </Text>
          </View>
          <Ruler style={BORDER_COLORS.GRAY} />
          {motivo!=undefined && (
            
            <View style={tw`mb-6`}>
              <Text style={tw`text-sm mx-auto w-11/12 ${TEXT_COLORS.DARK_BLUE}`}>
                Ingresa el motivo:
              </Text>
              <Input
                multiline
                numberOfLines={4}
                textAlignVertical="center"
                type="none"
                stylesInput="bg-white"
                value={motivo}
                setValue={setMotivo}
              />
            </View>
          )}
          <View style={tw`flex flex-row items-center justify-center pt-4`}>
            <UnfocusButton
              label="Cancelar"
              style="w-full mr-12"
              handleClick={() => {
                setConfirmation(false)
                setVisible(!visible)
              }}
            />
            <ButtonPrimary
              label="Confirmar"
              style={`w-full ${BACKGROUND_COLORS.SKY_BLUE} rounded-lg`}
              handleClick={() => {
                setConfirmation(true)
                setVisible(!visible)
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ConfirmationModal
