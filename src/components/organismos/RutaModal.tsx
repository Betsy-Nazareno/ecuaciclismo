import { NavigationProp, useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { Text, Modal, View, Pressable, Image } from 'react-native'
import tw from 'twrnc'
import { RootStackParamList, Screens } from '../../models/Screens.types'
import { TEXT_COLORS } from '../../utils/constants'
import { CustomText } from '../atomos/CustomText'
import Ruler from '../atomos/Ruler'
import SecondaryButton from '../atomos/SecondaryButton'

interface RutaModalProps {
  visible: boolean
  setVisible: (visible: boolean) => void
  participantes: any
  nombre: string
  horasEstimadas: number
  tokenRuta?: string
  handleAbandonar: () => void
}

const RutaModal = ({
  visible,
  setVisible,
  participantes,
  nombre,
  horasEstimadas,
  tokenRuta,
  handleAbandonar,
}: RutaModalProps) => {
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
      <View style={tw`flex h-full bg-black bg-opacity-20 relative`}>
        <View style={tw`absolute top-20 left-2 bg-white rounded-lg p-4 w-9/12`}>
          <View style={tw`pb-2 pl-2`}>
            <CustomText
              style={`${TEXT_COLORS.DARK_BLUE} text-2xl`}
              containerProps={{ textAlign: 'center' }}
            >
              {nombre}
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

          <View style={tw`flex flex-row items-center my-4 pl-8`}>
            <Image
              source={require('../../../assets/reloj_icon.png')}
              style={{ width: 15, height: 15, marginRight: 16 }}
            />
            <Text style={tw`${TEXT_COLORS.DARK_BLUE} text-base`}>
              {horasEstimadas} horas estimadas
            </Text>
          </View>

          <View style={tw`flex flex-row items-center mb-4 pl-8`}>
            <Image
              source={require('../../../assets/ciclista_en_ruta.png')}
              style={{ width: 20, height: 20, marginRight: 6 }}
            />
            <Text style={tw`${TEXT_COLORS.DARK_BLUE} text-base`}>
              {participantes?.length || 0} Ciclistas en ruta
            </Text>
          </View>

          <Ruler style="w-11/12 mx-auto mb-4" />

          <SecondaryButton
            label="Abandonar Ruta"
            style="w-9/12 mx-auto"
            handleClick={() => {
              handleAbandonar()
              navigation.navigate('RutaIncompleta', {
                tokenRuta: tokenRuta || '',
              })
            }}
          />
        </View>
      </View>
    </Modal>
  )
}

export default RutaModal
