import * as React from 'react'
import { Image, Text, View, Modal, Pressable } from 'react-native'
import tw from 'twrnc'
import {
  BACKGROUND_COLORS,
  BORDER_COLORS,
  TEXT_COLORS,
  imagesRoutes,
} from '../../utils/constants'
import ButtonPrimary from '../atomos/ButtonPrimary'
import Ruler from '../atomos/Ruler'
import UnfocusButton from '../atomos/UnfocusButton'

interface ConfirmationPopUpProps {
  visible: boolean
  setVisible: (visible: boolean) => void
  setConfirmation: (value: boolean) => void
  imageName: string
  body: string
}

const ConfirmationPopUp = ({
  visible,
  imageName,
  body,
  setVisible,
  setConfirmation,
}: ConfirmationPopUpProps) => {

  const labels: string[]= Object.keys(imagesRoutes)
  let indx=0
  while(indx<labels.length && imageName!= labels[indx]){indx++}
  let val
  (indx>=labels.length)?
    (val=require("../../../assets/failed.png")) : (val = Object.values(imagesRoutes)[indx])

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
            <View style={tw`flex flex-1 justify-center items-center`}>
                <Image
                    source={val}
                    style={{ width: 100, height: 100 }}
                />
            </View>
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
            <Text style={tw`text-sm text-justify mx-auto w-11/12 ${TEXT_COLORS.DARK_BLUE}`}>
              {body}
            </Text>
          </View>
          <Ruler style={BORDER_COLORS.GRAY} />
          <View style={tw`flex flex-row items-center justify-center pt-4`}>
            <UnfocusButton
              label="Cancelar"
              style="w-full mr-12"
              handleClick={() => {
                setVisible(!visible)
              }}
            />
            <ButtonPrimary
              label="Aceptar"
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

export default ConfirmationPopUp
