import * as React from 'react'
import { View, Pressable } from 'react-native'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import VerticalDivider from '../../atomos/VerticalDivider'
import DetalleUsuario from '../../moleculas/DetalleUsuario'
import Input from '../../atomos/Input'
import RoundedButtonIcon from '../../atomos/RoundedButtonIcon'
import tw from 'twrnc'

const InputAgregarComentario = () => {
  return (
    <RoundedWhiteBaseTemplate shadow={false}>
      <View style={tw`relative px-2`}>
        <View style={tw`pt-3 z-40`}>
          <DetalleUsuario hasDate={false} hasRole={false} />
        </View>
        <View style={tw`bg-white z-40 relative pt-2`}>
          <Input
            type="none"
            multiline
            numberOfLines={3}
            value=""
            setValue={(value) => {
              return value
            }}
            placeholder="Recuerda seguir las normas de la comunidad..."
          />
          <Pressable style={tw`absolute right-4 bottom-6`}>
            <RoundedButtonIcon
              style="h-8 w-8"
              src={require('../../../../assets/enviar_icon.png')}
              handleClick={() => {
                return
              }}
            />
          </Pressable>
        </View>
        <VerticalDivider />
      </View>
    </RoundedWhiteBaseTemplate>
  )
}

export default InputAgregarComentario
