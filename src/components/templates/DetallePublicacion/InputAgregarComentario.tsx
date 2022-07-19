import * as React from 'react'
import { View, Pressable } from 'react-native'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import VerticalDivider from '../../atomos/VerticalDivider'
import DetalleUsuario from '../../moleculas/DetalleUsuario'
import Input from '../../moleculas/Input'
import RoundedButtonIcon from '../../atomos/RoundedButtonIcon'
import tw from 'twrnc'
import FieldFormulario from '../../moleculas/FieldFormulario'

interface InputAgregarComentarioProps {
  handleSend: () => void
}

const InputAgregarComentario = ({
  handleSend,
}: InputAgregarComentarioProps) => {
  return (
    <RoundedWhiteBaseTemplate shadow={false}>
      <View style={tw`relative px-2`}>
        <View style={tw`pt-3 z-40`}>
          <DetalleUsuario hasDate={false} hasRole={false} />
        </View>
        <View style={tw`bg-white z-40 mt-4`}>
          <FieldFormulario>
            <View style={tw`flex flex-row items-center`}>
              <View style={tw`w-[88%]`}>
                <Input
                  type="none"
                  multiline
                  numberOfLines={3}
                  value=""
                  setValue={(value) => {
                    return value
                  }}
                  stylesInput="border-0"
                  placeholder="Recuerda seguir las normas de la comunidad..."
                />
              </View>
              <Pressable style={tw`w-[5%]`}>
                <RoundedButtonIcon
                  style="h-8 w-8"
                  src={require('../../../../assets/enviar_icon.png')}
                  handleClick={handleSend}
                />
              </Pressable>
            </View>
          </FieldFormulario>
        </View>
        <VerticalDivider />
      </View>
    </RoundedWhiteBaseTemplate>
  )
}

export default InputAgregarComentario
