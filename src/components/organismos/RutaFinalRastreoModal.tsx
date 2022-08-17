import * as React from 'react'
import tw from 'twrnc'
import { Text, View, StyleSheet, Modal, Pressable } from 'react-native'
import { CustomText } from '../atomos/CustomText'
import { BACKGROUND_COLORS, TEXT_COLORS } from '../../utils/constants'
import Ruler from '../atomos/Ruler'
import ButtonPrimary from '../atomos/ButtonPrimary'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../models/Screens.types'

interface RutaFinalRastreoModalProps {
  visible: boolean
  setVisible: (visible: boolean) => void
  deleteUser: () => void
}

const RutaFinalRastreoModal = ({
  visible,
  setVisible,
  deleteUser,
}: RutaFinalRastreoModalProps) => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
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
        style={tw`flex justify-center items-center h-full bg-black bg-opacity-20`}
      >
        <View style={tw`bg-white rounded-lg p-4 w-11/12`}>
          <View style={tw`pb-2 pl-2`}>
            <CustomText
              style={`${TEXT_COLORS.DARK_BLUE} text-2xl`}
              containerProps={{ textAlign: 'center' }}
            >
              Final del Recorrido
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

          <View style={tw`p-2 pb-4`}>
            <Text style={tw`text-black opacity-50 text-center`}>
              ¡Haz llegado al final de esta ruta, Veamos tus hitos en la
              carrera!
            </Text>
          </View>
          <View style={tw`flex flex-row flex-wrap px-2 mb-2`}></View>

          <ButtonPrimary
            label="Continuar"
            style={`${BACKGROUND_COLORS.PRIMARY_BLUE} bg-opacity-80 py-2 rounded-3xl`}
            handleClick={() => {
              navigation.navigate('FinalRuta')
              deleteUser()
              setVisible(false)
            }}
          />
        </View>
      </View>
    </Modal>
  )
}

export default RutaFinalRastreoModal
