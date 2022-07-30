import * as React from 'react'
import { View, Pressable } from 'react-native'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import tw from 'twrnc'
import RoundedButtonIcon from '../../atomos/RoundedButtonIcon'
import { CustomText } from '../../atomos/CustomText'
import Gap from '../../atomos/Gap'
import { TEXT_COLORS } from '../../../utils/constants'

interface BotonAgregarComentarioProps {
  handleClick: () => void
}

const BotonAgregarComentario = ({
  handleClick,
}: BotonAgregarComentarioProps) => {
  return (
    <Pressable onPress={handleClick}>
      <RoundedWhiteBaseTemplate shadow={false}>
        <View style={tw`relative`}>
          <View style={tw`py-1 flex flex-row items-center mx-auto`}>
            <RoundedButtonIcon
              style="h-8 w-8"
              src={require('../../../../assets/plus.png')}
              handleClick={() => {
                return
              }}
            />
            <Gap px="5">
              <CustomText style={TEXT_COLORS.DARK_BLUE}>
                Agregar comentario
              </CustomText>
            </Gap>
          </View>
        </View>
      </RoundedWhiteBaseTemplate>
    </Pressable>
  )
}

export default BotonAgregarComentario
