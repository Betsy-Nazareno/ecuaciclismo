import * as React from 'react'
import { Text, View, Image } from 'react-native'
import RoundedWhiteBaseTemplate from '../../organismos/RoundedWhiteBaseTemplate'
import { CustomText } from '../../atomos/CustomText'
import { TEXT_COLORS, WIDTH_DIMENSIONS } from '../../../utils/constants'
import DetallePublicador from '../../moleculas/DetalleUsuario'
import VerticalDivider from '../../atomos/VerticalDivider'
import Reacciones from '../../moleculas/BarraReacciones'
import BotonAgregarComentario from './BotonAgregarComentario'
import InputAgregarComentario from './InputAgregarComentario'
import TarjetaComentarioPublicacion from './TarjetaComentarioPublicacion'
import tw from 'twrnc'
import MenuPublicaciones from '../../moleculas/MenuPublicaciones'

const Publicacion = () => {
  const [isAddingComent, setIsAddingComent] = React.useState(false)
  return (
    <View style={tw`p-2`}>
      <RoundedWhiteBaseTemplate shadow={false}>
        <View style={tw`relative`}>
          <View style={tw`w-11/12`}>
            <CustomText
              style={`text-xl ${TEXT_COLORS.DARK_BLUE}`}
              containerProps={{ textAlign: 'center' }}
            >
              Descuento en respuestos
            </CustomText>
          </View>
          <View style={tw`absolute right-0`}>
            <MenuPublicaciones />
          </View>
        </View>

        <View style={tw`pt-3 px-2 relative pb-6 z-10`}>
          <View style={tw`z-40`}>
            <DetallePublicador />
          </View>

          <VerticalDivider style="top-4" />

          <View style={tw`ml-10 mt-6`}>
            <View style={tw`ml-2`}>
              <Image
                source={require('../../../../assets/paseo.jpg')}
                style={{ width: WIDTH_DIMENSIONS * 0.7, height: 200 }}
              />
            </View>

            <View style={tw`pt-4 pl-4`}>
              <Text>
                Hola! Me llamo José! Vendemos una variedad de artículos para
                ciclismo así como repuestos para tu bicicleta.
              </Text>
            </View>

            {/**Aqui irian los archivos y audios */}
            <View style={tw`mx-auto pt-10`}>
              <Reacciones />
            </View>
          </View>
        </View>
      </RoundedWhiteBaseTemplate>

      <TarjetaComentarioPublicacion />

      <TarjetaComentarioPublicacion />

      <TarjetaComentarioPublicacion />

      <TarjetaComentarioPublicacion />

      {!isAddingComent && (
        <View style={tw``}>
          <BotonAgregarComentario handleClick={() => setIsAddingComent(true)} />
        </View>
      )}

      {isAddingComent && (
        <View style={tw`pt-2`}>
          <InputAgregarComentario handleSend={() => setIsAddingComent(false)} />
        </View>
      )}
    </View>
  )
}

export default Publicacion
