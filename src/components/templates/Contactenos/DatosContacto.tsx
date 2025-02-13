import * as React from 'react'
import tw from 'twrnc'
import { Text, View, Image } from 'react-native'
import { CustomText } from '../../atomos/CustomText'
import { TEXT_COLORS } from '../../../utils/constants'

const DatosContacto = () => {
  return (
    <View style={tw`bg-white px-2 pt-8`}>
      <View style={tw`mx-auto`}>
        <Image source={require('../../../../assets/ecuaciclismo_logo.png')} />
      </View>
      <CustomText
        containerProps={{ textAlign: 'center', marginBottom: 16 }}
        style={`text-lg ${TEXT_COLORS.DARK_BLUE}`}
      >
        Sobre Nosotros
      </CustomText>
      <Text style={tw`text-base ${TEXT_COLORS.DARK_BLUE} px-8 text-center`}>
        Nuestro fin es promover el uso de la bicicleta; como un medio de
        transporte que no contamina el medio ambiente, ayuda a la salud de las
        personas y fomenta el cicloturismo o turismo de aventura.
      </Text>
      <View style={tw`mt-16`}>
        <Text style={tw`text-base ${TEXT_COLORS.DARK_BLUE} px-8 text-center`}>
          Si tienes dudas o sugerencias para mejorar esta app, por favor,
          contactanos al
        </Text>
        <Text
          style={tw`text-base ${TEXT_COLORS.DARK_BLUE} px-8 text-center pt-4`}
        >
          Teléfono: +593995523753
        </Text>
        <Text style={tw`text-base ${TEXT_COLORS.DARK_BLUE} px-8 text-center`}>
          Email: ecuadorsanchez@gmail.com
        </Text>
      </View>
    </View>
  )
}

export default DatosContacto
