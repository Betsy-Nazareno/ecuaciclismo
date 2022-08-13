import * as React from 'react'
import tw from 'twrnc'
import { Modal, Pressable, Text, View } from 'react-native'
import { BACKGROUND_COLORS, TEXT_COLORS } from '../../utils/constants'
import { CustomText } from '../atomos/CustomText'
import Ruler from '../atomos/Ruler'
import { catalogs } from '../../models/Rutas'
import TextCheck from '../atomos/TextCheck'
import ButtonPrimary from '../atomos/ButtonPrimary'

interface RutaColaboracionesModalProps {
  visible: boolean
  setVisible: (visible: boolean) => void
  colaboraciones: catalogs[]
  handleAdd: (value: string) => void
  inscribirUser: () => void
}

const RutaColaboracionesModal = ({
  visible,
  setVisible,
  colaboraciones,
  handleAdd,
  inscribirUser,
}: RutaColaboracionesModalProps) => {
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
              Colaboraciones
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
            <Text style={tw`text-black opacity-50`}>
              Seleccione elementos del listado con los que esté dispuesto a
              colaborar
            </Text>
          </View>
          <View style={tw`flex flex-row flex-wrap px-2 mb-2`}>
            {colaboraciones.map((colaboracion, index) => (
              <TextCheck
                key={index}
                option={colaboracion}
                handleClick={handleAdd}
                style="w-6/12 py-2"
              />
            ))}
          </View>

          <ButtonPrimary
            label="Continuar"
            style={`${BACKGROUND_COLORS.PRIMARY_BLUE} bg-opacity-80 py-2 rounded-3xl`}
            handleClick={() => {
              inscribirUser()
              setVisible(false)
            }}
          />
        </View>
      </View>
    </Modal>
  )
}

export default RutaColaboracionesModal
