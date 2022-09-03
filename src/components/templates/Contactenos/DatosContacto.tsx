import * as React from 'react'
import tw from 'twrnc'
import { Text, View, Image } from 'react-native'
import { CustomText } from '../../atomos/CustomText'
import { TEXT_COLORS } from '../../../utils/constants'
import { Linking, Platform } from 'react-native'

const DatosContacto = () => {
  const phoneCall = (phone: string) => {
    let phoneNumber = ''
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${phone}`
    } else {
      phoneNumber = `telprompt:${phone}`
    }
    Linking.openURL(phoneNumber)
  }

  return (
    <View style={tw`bg-white px-2 mt-8`}>
      <CustomText
        containerProps={{ textAlign: 'center', marginBottom: 16 }}
        style={`text-xl ${TEXT_COLORS.DARK_BLUE}`}
      >
        SOBRE NOSOTROS
      </CustomText>
      <Text style={tw`text-base ${TEXT_COLORS.DARK_BLUE} px-8 text-center`}>
        El propósto de <Text style={tw`font-bold`}>Ecuaciclismo</Text> es
        promover el uso de la bicicleta como un medio de transporte que no
        contamina el medio ambiente, ayuda a la salud de las personas y fomenta
        el cicloturismo o turismo de aventura.
      </Text>
      <Text
        style={tw`text-base ${TEXT_COLORS.DARK_BLUE} px-8 text-center mt-4`}
      >
        Esta aplicación tiene el objetivo principal de servir de soporte para la
        organización de actividades dentro de la comunidad. Además podrás
        compartir momentos agradables con los demás participantes.
      </Text>
      <Text
        style={tw`text-base ${TEXT_COLORS.DARK_BLUE} px-8 text-center mt-8`}
      >
        Si tienes dudas o sugerencias para mejorar esta app, por favor,
        contactanos por estos medios:
      </Text>
      <Text
        style={tw`text-base ${TEXT_COLORS.DARK_BLUE} px-8 text-center pt-6 pb-4`}
        onPress={() => phoneCall('0995523753')}
      >
        Teléfono:{' '}
        <Text style={tw`${TEXT_COLORS.DARK_BLUE} underline`}>0995523753</Text>
      </Text>
      <Text
        style={tw`text-base ${TEXT_COLORS.DARK_BLUE} px-8 text-center`}
        onPress={() => Linking.openURL('mailto:ecuaciclismo@gmail.com')}
      >
        Email:{' '}
        <Text style={tw`${TEXT_COLORS.DARK_BLUE} underline`}>
          ecuaciclismo@gmail.com
        </Text>
      </Text>
    </View>
  )
}

export default DatosContacto
